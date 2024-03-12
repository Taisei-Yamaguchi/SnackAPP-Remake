from ..models import TorikoSnackModel

def getTorikoSnack(type,maker,keyword,country,sort,order,offset):
    queryset = TorikoSnackModel.objects.all()

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
    elif order== 'random':
        queryset = queryset.order_by('?')

    # apply offset
    queryset = queryset[int(offset):int(offset) + 100]

    data = [{'id':obj.id, 'tid':obj.tid, 'name': obj.name, 'type': obj.type, 'maker': obj.maker, 'price':obj.price, 'image':obj.image, 'url':obj.url }  for obj in queryset]
    return data