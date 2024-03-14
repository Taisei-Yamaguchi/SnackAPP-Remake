from django.urls import path
from .views import TorikoLikeAPIView

urlpatterns = [
    path('toriko_snack/<int:toriko_snack_id>/', TorikoLikeAPIView.as_view(), name='toriko_like_toggle'),
]
