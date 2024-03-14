from django.db import models
from accounts.models import Account
from django.core.exceptions import ValidationError

class SnackModel(models.Model):
    tid = models.CharField(unique=True, null=True)
    name = models.CharField(max_length=255)
    maker = models.CharField(max_length=255)
    price = models.IntegerField(null=True) 
    type = models.CharField(max_length=50)
    country = models.CharField(max_length=255)
    image = models.CharField(max_length=255, null=True)
    url = models.URLField(null=True)
    show = models.BooleanField(default=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)  
    like_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def clean(self):
        # Check if both tid and account are not null
        if self.tid is None and self.account is None:
            raise ValidationError("Both tid and account cannot be null.")
        # Check if both tid and account are not both filled
        if self.tid and self.account:
            raise ValidationError("Either tid or account should be null, not both filled.")
    def increment_like_count(self):
        self.like_count += 1
        self.save()

    def decrement_like_count(self):
        if self.like_count > 0:
            self.like_count -= 1
            self.save()