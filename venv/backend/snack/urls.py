from django.urls import path
from .views import SnackSearchAPIView 

urlpatterns = [
    path('search/', SnackSearchAPIView.as_view(), name='snack-search'),
]
