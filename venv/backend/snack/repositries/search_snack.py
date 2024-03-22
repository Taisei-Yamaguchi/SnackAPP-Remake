from ..models import SnackModel
from like.models import LikeModel
from django.db.models import Case, When, F, DecimalField
from translate import Translator
from translate.exceptions import TranslationError
import math

def getSearchSnack(login_user,type,maker,keyword,country,order,offset,only_like,only_you_post,only_users_post,language):
    queryset = SnackModel.objects.all().filter(show=True).order_by("-id")
    translator = Translator(to_lang="ja")

    translated_keyword = translator.translate(keyword) if keyword else None
    translated_maker = translator.translate(maker) if maker else None
    
    # filter
    if type:
        queryset = queryset.filter(type__icontains=type)
    if maker:
        queryset = queryset.filter(maker__icontains=maker) | \
        queryset.filter(maker__icontains=translated_maker) 
    if keyword:
        queryset = queryset.filter(name__icontains=translated_keyword) | \
        queryset.filter(type__icontains=translated_keyword) | \
        queryset.filter(maker__icontains=translated_keyword) | \
        queryset.filter(name__icontains=keyword) | \
        queryset.filter(maker__icontains=keyword) | \
        queryset.filter(type__icontains=keyword) 
                
    if country == 'Japan':
        queryset = queryset.filter(country="Japan")
    elif country == 'Canada':
        queryset = queryset.filter(country="Canada")
    elif country == 'Other':
        queryset = queryset.exclude(country__in=["Japan", "Canada"])
        
    # order 
    if order == 'price_asc': 
        queryset = queryset.exclude(price=0)
        queryset = queryset.annotate(edited_price=Case(When(country='Canada', then=F('price') * 100), default=F('price'), output_field=DecimalField()))
        queryset = queryset.order_by('edited_price')
    elif order == 'price_desc':
        queryset = queryset.exclude(price=0)
        queryset = queryset.annotate(edited_price=Case(When(country='Canada', then=F('price') * 100), default=F('price'), output_field=DecimalField()))
        queryset = queryset.order_by('-edited_price')
    elif order == 'popularity':
        queryset = queryset.order_by('-like_count')
    elif order== 'random':
        queryset = queryset.order_by('?')
    else :
        queryset = queryset.order_by('-id')
        
    # only_ike
    if only_like and login_user is not None:
        liked_snack_ids = LikeModel.objects.filter(account_id=login_user.id).values_list('snack_id', flat=True)
        queryset = queryset.filter(id__in=liked_snack_ids)
    
    # only_you_post
    if only_you_post and login_user is not None:
        queryset = queryset.filter(account=login_user)
    
    # only_users_post
    if only_users_post:
        queryset = queryset.exclude(account__isnull=True)
    
    # total_result
    total_results = queryset.count()
    items_per_page = 10  
    total_pages = math.ceil(total_results / items_per_page)
    
    # apply offset
    queryset_check= queryset[int(offset):int(offset) + 10]
    if offset>0 and queryset_check.count()==0:
        offset=0
        queryset = queryset[:10]
    else:
        queryset=queryset_check
    
    data = []
    translations = {}
    if language=="en":    
        translator_en = Translator(from_lang="ja", to_lang="en")
        
        # Collect unique names to translate
        unique_names = set(obj.name for obj in queryset)

        #　check translation error
        try:
            translated_names = translator_en.translate("\n".join(unique_names)).split('\n')
            for original_name, translated_name in zip(unique_names, translated_names):
                translations[original_name] = translated_name
                if 'MYMEMORY WARNING' in translated_name:
                    translations[original_name] = original_name
                else:
                    translations[original_name] = translated_name
        except TranslationError as e:
            # Handle translation error
            print("Translation error:", )
            # Use original names
            for name in unique_names:
                translations[name] = name
    
            
    for obj in queryset:
        # Check if the account has liked this Snack
        liked = False if login_user is None else LikeModel.objects.filter(account_id=login_user.id, snack_id=obj.id).exists()
        # translated_name = translator_en.translate(obj.name) if language=="en" else obj.name
        translated_name = translations.get(obj.name, obj.name) 

        data.append({
            'id': obj.id,
            'tid': obj.tid,
            'name': translated_name,
            'type': obj.type,
            'maker': obj.maker,
            'country': obj.country,
            'price': obj.price,
            'image': obj.image,
            'url': obj.url,
            'liked': liked,
            'like_count': obj.like_count,
            'account':
                {  
                'id':str(obj.account.id),
                'username':obj.account.username
                } if obj.account else None
        })
        
        
    return {"result":data,"total_pages":total_pages}