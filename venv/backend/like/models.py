from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from accounts.models import Account
from snack.models import PostSnackModel, TorikoSnackModel

class LikeModel(models.Model):
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    post_snack_id = models.ForeignKey(PostSnackModel, on_delete=models.CASCADE, null=True, blank=True)
    toriko_snack_id = models.ForeignKey(TorikoSnackModel, on_delete=models.CASCADE, null=True, blank=True)
    
    def clean(self):
        if self.post_snack_id is None and self.toriko_snack_id is None:
            raise ValidationError(_("Either 'post_snack_id' or 'toriko_snack_id' must be provided."))
        elif self.post_snack_id is not None and self.toriko_snack_id is not None:
            raise ValidationError(_("Only one of 'post_snack_id' or 'toriko_snack_id' can be provided."))

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        
    
