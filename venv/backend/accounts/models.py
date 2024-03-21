from django.db import models
from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    """Extended Accounts"""
    LANGUAGE_CHOICES = (
        ('en', 'English'),
        ('ja', 'Japanese'),
    )
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='ja')

    class Meta:
        verbose_name_plural ="Account"
