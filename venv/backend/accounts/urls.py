from django.urls import path
from .views import CreateAccountAPIView,LoginAPIView

urlpatterns = [
    path('create/', CreateAccountAPIView.as_view(), name='create-new-account'),
    path('login/', LoginAPIView.as_view(), name='login'),
]
