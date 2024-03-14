from django.urls import path
from .views import TorikoLikeAPIView

urlpatterns = [
    path('<int:snack_id>/', TorikoLikeAPIView.as_view(), name='toriko_like_toggle'),
]
