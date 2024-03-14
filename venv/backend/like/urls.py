from django.urls import path
from .views import LikeAPIView

urlpatterns = [
    path('<int:snack_id>/', LikeAPIView.as_view(), name='toriko_like_toggle'),
    
]
