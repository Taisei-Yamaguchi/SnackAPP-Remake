from django.urls import path
from .views import TorikoAPIView ,TorikoSearchAPIView 

urlpatterns = [
    path('toriko/', TorikoAPIView.as_view(), name='toriko_api'),
    path('toriko-search/', TorikoSearchAPIView.as_view(), name='toriko_search_api'),
]
