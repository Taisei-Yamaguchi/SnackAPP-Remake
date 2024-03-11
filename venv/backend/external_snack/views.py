from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .external_api.toriko_api import get_toriko_data

class TorikoAPIView(APIView):
    def get(self, request):
        return Response(get_toriko_data())
