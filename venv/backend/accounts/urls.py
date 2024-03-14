from django.urls import path
from .views import CreateAccountAPIView

urlpatterns = [
    path('create/', CreateAccountAPIView.as_view(), name='create-new-account'),
]
