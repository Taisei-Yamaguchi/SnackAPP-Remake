from ..models import SnackModel

def hide_snack(snack_id,loginUser):
    try:
        snack = SnackModel.objects.get(id=snack_id)
    except SnackModel.DoesNotExist:
        return {'error': 'Snack does not exist','status':404}
    
    # Check if the snack is associated with the authenticated user
    if snack.account != loginUser:
        return {'error': 'Unauthorized','status':401}
        
    snack.show = False
    snack.save()
    return {"message":f"Snack {snack.name} hidden successfully !!",'status':200}