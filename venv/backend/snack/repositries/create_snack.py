from ..models import SnackModel

def create_snack(name,maker,type,country,price,url,account,image_url):
    snack = SnackModel.objects.create(
            name=name,
            maker=maker,
            type=type,
            country=country,
            price=price,
            url=url,
            account=account,
            image=image_url 
        )
    
    response_data = {
            'id': snack.id,
            'tid':snack.tid,
            'name': snack.name,
            'maker': snack.maker,
            'type': snack.type,
            'country': snack.country,
            'price': snack.price,
            'url': snack.url,
            'image':snack.image,
            'account': snack.account.id, 
        }
    
    return response_data