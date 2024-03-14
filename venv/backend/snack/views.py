from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .repositries.search_snack import getSearchSnack


class SnackSearchAPIView(APIView):
    def get(self,request):
        # query
        type = request.query_params.get('type', None)
        maker = request.query_params.get('maker', None)
        keyword = request.query_params.get('keyword', None)
        order = request.query_params.get('order', None)
        country = request.query_params.get('country', None)
        sort = request.query_params.get('sort', None)
        offset = request.query_params.get('offset',0)
        
        data = getSearchSnack(
            type=type,
            maker=maker,
            keyword=keyword,
            order=order,
            country=country,
            sort=sort,
            offset=offset
        )
        
        return Response(data)