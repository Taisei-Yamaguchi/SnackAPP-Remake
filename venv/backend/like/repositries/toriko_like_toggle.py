from ..models import LikeModel
from snack.models import TorikoSnackModel
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

def toriko_like_toggle(account, toriko_snack_id):
    try:
        toriko_snack = TorikoSnackModel.objects.get(id=toriko_snack_id)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'TorikoSnackModel not found'}, status=404)
    
    # search Like record
    like_instance = LikeModel.objects.filter(toriko_snack_id=toriko_snack, account_id=account).first()

    # if record exist, delete
    if like_instance:
        like_instance.delete()
        toriko_snack.decrement_like_count()
        message = 'Like removed'
    else:
        # If record dosen't exist, create
        LikeModel.objects.create(toriko_snack_id=toriko_snack, account_id=account)
        toriko_snack.increment_like_count()
        message = 'Like added'
    
    return ({message:message})