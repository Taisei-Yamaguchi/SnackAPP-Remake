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
from .models import SnackModel
from random import sample
from .services.define_recommend_snack_logic import define_recommend_snack_logic
from .repositries.get_snacks_by_rule import get_snacks_by_rule
from .serializers import SnackSerializer

import cloudinary
import cloudinary.uploader

class SnackSearchAPIView(APIView):
    permission_classes = [AllowAny]  # No matter token exist or not, it's possible to search snack.

    def get(self,request):
        login_user = None
        
        if request.user.is_authenticated:
            login_user = request.user
        
        # query
        type = request.query_params.get('type', None)
        maker = request.query_params.get('maker', None)
        keyword = request.query_params.get('keyword', None)
        order = request.query_params.get('order', None)
        country = request.query_params.get('country', None)
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
        name = request.data.get('name')
        maker = request.data.get('maker')
        type = request.data.get('type')
        country = request.data.get('country')
        price = request.data.get('price')
        url = request.data.get('url', None)
        account = request.user

        image_file = request.FILES.get('image', None)
        # upload image and get 'url', Cloudinary
        if image_file:
            result = cloudinary.uploader.upload(
                image_file,
                folder="snack_images"
            )
            image_url = result['secure_url']
        else:
            image_url = None
            
        snack = SnackModel.objects.create(
            name=name,
            maker=maker,
            type=type,
            country=country,
            price=price,
            url=url,
            account=account,
            image=image_url 
        )
        
        response_data = {
            'id': snack.id,
            'tid':snack.tid,
            'name': snack.name,
            'maker': snack.maker,
            'type': snack.type,
            'country': snack.country,
            'price': snack.price,
            'url': snack.url,
            'image':snack.image,
            'account': snack.account.id, 
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
        

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
    
class RecommendSnackAPIView(APIView):
    permission_classes = [AllowAny]  # No matter token exist or not, it's possible to search snack.

    def get(self, request):
        login_user = None
        if request.user.is_authenticated:
            login_user = request.user
            
        # define recommend snack logic
        # "random_popularity", "type_you_like", "country_you_like", "maker_you_like"
        get_snack_rule = define_recommend_snack_logic(login_user)
        recommended_snacks = get_snacks_by_rule(get_snack_rule,login_user)
        # print("recommended_snacks:",recommended_snacks)
        return Response(recommended_snacks)