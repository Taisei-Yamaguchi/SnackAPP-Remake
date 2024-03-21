from ..models import SnackModel
from like.models import LikeModel
from accounts.models import Account
from django.db.models import Case, When, F, DecimalField
from translate import Translator

def getSearchSnack(login_user,type,maker,keyword,country,order,offset,only_like,only_you_post,only_users_post):
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
    
    # apply offset
    queryset = queryset[int(offset):int(offset) + 100]
    
    data = []
    for obj in queryset:
        # Check if the account has liked this Snack
        liked = False if login_user is None else LikeModel.objects.filter(account_id=login_user.id, snack_id=obj.id).exists()
        
        data.append({
            'id': obj.id,
            'tid': obj.tid,
            'name': obj.name,
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
        
    return data