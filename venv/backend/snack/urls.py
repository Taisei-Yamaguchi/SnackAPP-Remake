from django.urls import path
from .views import TorikoSearchAPIView 

urlpatterns = [
    path('toriko-search/', TorikoSearchAPIView.as_view(), name='toriko_search_api'),
]
