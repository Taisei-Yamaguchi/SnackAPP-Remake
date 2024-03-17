from ..models import SnackModel
from like.models import LikeModel
from accounts.models import Account

def getSearchSnack(login_user,type,maker,keyword,country,sort,order,offset,only_like,only_you_post,only_users_post):
    queryset = SnackModel.objects.all().filter(show=True)
    
    # filter
    if type:
        queryset = queryset.filter(type__icontains=type)
    if maker:
        queryset = queryset.filter(maker__icontains=maker)
    if keyword:
        queryset = queryset.filter(name__icontains=keyword) | \
        queryset.filter(type__icontains=keyword) | \
        queryset.filter(maker__icontains=keyword)
            
    if country == 'other':
        queryset = queryset.filter(maker="海外")
    elif country == 'japan':
        queryset = queryset.exclude(maker="海外")
            
    # sort
    if sort == 'type':
        queryset = queryset.order_by('type')
    elif sort == 'name':
        queryset = queryset.order_by('name')
    elif sort == 'maker':
        queryset = queryset.order_by('maker')
        
    # order 
    if order == 'price_asc': 
        queryset = queryset.exclude(price=0).order_by('price')
    elif order == 'price_desc':
        queryset = queryset.order_by('-price')
    elif order == 'popularity':
        queryset = queryset.order_by('-like_count')
    elif order== 'random':
        queryset = queryset.order_by('?')
    else :
        queryset = queryset.order_by('id')
        
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
        # Check if the account has liked this TorikoSnack
        liked = False if login_user is None else LikeModel.objects.filter(account_id=login_user.id, snack_id=obj.id).exists()
        # Get the number of likes for this TorikoSnack
        like_count = LikeModel.objects.filter(snack_id=obj.id).count()

        data.append({
            'id': obj.id,
            'tid': obj.tid,
            'name': obj.name,
            'type': obj.type,
            'maker': obj.maker,
            'price': obj.price,
            'image': obj.image,
            'url': obj.url,
            'liked': liked,
            'like_count': like_count,
            'account':
                {  
                'id':str(obj.account.id),
                'username':obj.account.username
                } if obj.account else None
        })
        
    return data