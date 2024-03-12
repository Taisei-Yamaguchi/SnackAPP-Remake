from django.db import models

class TorikoSnackModel(models.Model):
    tid =models.CharField(unique=True,null=True)
    name = models.CharField(max_length=255)
    maker = models.CharField(max_length=255)
    price = models.IntegerField(null=True) 
    type = models.CharField(max_length=50)
    url = models.URLField(null=True)
    image = models.URLField(null=True)

    def __str__(self):
        return self.name
                
    def save(self, *args, **kwargs):
        """
        Save the model instance, ensuring that fields are validated and cleaned before saving.
        """
        self.full_clean()  # Validate and clean all fields before saving
        super().save(*args, **kwargs)