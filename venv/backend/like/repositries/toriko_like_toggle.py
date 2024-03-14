from ..models import LikeModel
from snack.models import SnackModel
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

def toriko_like_toggle(account, snack_id):
    try:
        snack = SnackModel.objects.get(id=snack_id)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'TorikoSnackModel not found'}, status=404)
    
    # search Like record
    like_instance = LikeModel.objects.filter(snack_id=snack, account_id=account).first()

    # if record exist, delete
    if like_instance:
        like_instance.delete()
        snack.decrement_like_count()
        message = 'Like removed'
    else:
        # If record dosen't exist, create
        LikeModel.objects.create(snack_id=snack, account_id=account)
        snack.increment_like_count()
        message = 'Like added'
    
    return ({message:message})