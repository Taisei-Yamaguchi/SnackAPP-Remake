from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from accounts.models import Account
from .repositries.toriko_like_toggle import toriko_like_toggle

class TorikoLikeAPIView(APIView):
    def patch(self,request,toriko_snack_id):
        # temprary data
        loginUser= Account.objects.first()
        data = toriko_like_toggle(loginUser,toriko_snack_id)
        return Response(data)