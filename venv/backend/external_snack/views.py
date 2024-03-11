from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .external_api.toriko_api import get_toriko_data, get_toriko_data_filter

class TorikoAPIView(APIView):
    def get(self, request):
        return Response(get_toriko_data())
    
class TorikoSearchAPIView(APIView):
    def get(self,request):
        
        # query
        type = request.query_params.get('type', None)
        maker = request.query_params.get('maker', None)
        keyword = request.query_params.get('keyword', None)
        order = request.query_params.get('order', None)
        sort = request.query_params.get('sort', None)
        
        data = get_toriko_data_filter(type, maker, keyword, sort, order)
        return Response(data)
