from rest_framework import serializers
from .models import SnackModel

class SnackSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnackModel
        fields = '__all__'
