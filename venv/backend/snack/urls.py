from django.urls import path
from .views import SnackSearchAPIView ,CreateSnackAPIView, HideSnackAPIView

urlpatterns = [
    path('search/', SnackSearchAPIView.as_view(), name='search-snack'),
    path('create/', CreateSnackAPIView.as_view(), name='create-snack'),
    path('hide/<int:snack_id>/', HideSnackAPIView.as_view(), name='hide-snack'),
]
