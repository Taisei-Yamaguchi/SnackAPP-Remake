from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from accounts.models import Account
from snack.models import SnackModel

class LikeModel(models.Model):
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    snack_id = models.ForeignKey(SnackModel, on_delete=models.CASCADE,null=True)
    
    class Meta:
        unique_together = ('account_id', 'snack_id')
        
    def clean(self):
        if self.account_id is None:
            raise ValidationError("account_id cannot be null.")
        if self.snack_id is None:
            raise ValidationError("snack_id cannot be null.")
        
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
