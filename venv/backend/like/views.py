from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from accounts.models import Account
from .repositries.like_toggle import snack_like_toggle

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class LikeAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self,request,snack_id):
        # temprary data
        loginUser= request.user
        data = snack_like_toggle(loginUser,snack_id)
        return Response(data)