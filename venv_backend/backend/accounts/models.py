from django.db import models
from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    """Extended Accounts"""
    
    class Meta:
        verbose_name_plural ="Account"
