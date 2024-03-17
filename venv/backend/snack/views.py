from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .serializers import SnackSerializer
from rest_framework import status
from accounts.models import Account
from .repositries.search_snack import getSearchSnack
from .repositries.hide_snack import hide_snack
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class SnackSearchAPIView(APIView):
    permission_classes = [AllowAny]  # No matter token exist or not, it's possible to search snack.

    def get(self,request):
        login_user = None
        
        if request.user.is_authenticated:
            login_user = request.user
        print(login_user)
        
        # query
        type = request.query_params.get('type', None)
        maker = request.query_params.get('maker', None)
        keyword = request.query_params.get('keyword', None)
        order = request.query_params.get('order', None)
        country = request.query_params.get('country', None)
        sort = request.query_params.get('sort', None)
        offset = request.query_params.get('offset',0)
        only_like = request.query_params.get("only_like",False)
        only_you_post = request.query_params.get("only_you_post",False)
        only_users_post = request.query_params.get("only_users_post",False)
        
        data = getSearchSnack(
            login_user=login_user,
            type=type,
            maker=maker,
            keyword=keyword,
            order=order,
            country=country,
            sort=sort,
            offset=offset,
            only_like=only_like,
            only_you_post=only_you_post,
            only_users_post=only_users_post,
        )
        
        return Response(data)


class CreateSnackAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        data=request.data
        account = request.user
        
        print(data)
        data["account"]= account.id
        
        serializer = SnackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HideSnackAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, snack_id, *args, **kwargs):
        
        response = hide_snack(snack_id=snack_id, loginUser=request.user)
        
        if response is 'error' in response:
            if response["error"]==401:
                return Response({'error': 'Unauthorized'}, status= status.HTTP_401_UNAUTHORIZED)
            else: 
                return Response({'error': 'Snack does not exist' }, status=status.HTTP_404_NOT_FOUND)
        return Response(response, status=status.HTTP_204_NO_CONTENT)