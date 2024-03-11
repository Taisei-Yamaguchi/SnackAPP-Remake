from django.contrib import admin
from django.urls import path, include
from .views import TorikoAPIView  

urlpatterns = [
    path('toriko/', TorikoAPIView.as_view(), name='toriko_api'),
]
