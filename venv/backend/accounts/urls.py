from django.urls import path
from .views import CreateAccountAPIView,LoginAPIView,SignUpAPIView,LogoutAPIView

urlpatterns = [
    path('create/', CreateAccountAPIView.as_view(), name='create-new-account'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('signup/', SignUpAPIView.as_view(), name='signup'),
    path('logout/',LogoutAPIView.as_view(),name='logout'),
]
