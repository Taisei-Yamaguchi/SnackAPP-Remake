from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .repositries.search_snack import getSearchSnack
from .repositries.hide_snack import hide_snack
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .services.define_recommend_snack_logic import define_recommend_snack_logic
from .repositries.get_recommended_snacks import get_snacks_by_rule
from .repositries.create_snack import create_snack
from .services.upload_cloudinary import upload_cloudinary

class SnackSearchAPIView(APIView):
    permission_classes = [AllowAny]  # No matter token exist or not, it's possible to search snack.

    def get(self,request):
        login_user = None
        language= "ja"
        
        if request.user.is_authenticated:
            login_user = request.user
            language= login_user.language
        
        # query
        type = request.query_params.get('type', None)
        maker = request.query_params.get('maker', None)
        keyword = request.query_params.get('keyword', None)
        order = request.query_params.get('order', None)
        country = request.query_params.get('country', None)
        page = request.query_params.get('page',1)
        only_like = request.query_params.get("only_like",False)
        only_you_post = request.query_params.get("only_you_post",False)
        only_users_post = request.query_params.get("only_users_post",False)
        
        offset = max((int(page) - 1) * 10, 0)
        
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
            language=language
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
            image_url = upload_cloudinary(image_file)
        else:
            image_url = None
            
        # create SnackModel
        response_data = create_snack(
            name=name,
            maker=maker,
            type=type,
            country=country,
            price=price,
            url=url,
            account=account,
            image_url=image_url 
        )
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
    permission_classes = [AllowAny]  # No matter token exist or not, it's possible to get  recommended-snack.

    def get(self, request):
        login_user = None
        if request.user.is_authenticated:
            login_user = request.user
            
        # define recommend snack logic
        # "random_popularity", "type_you_like", "country_you_like", "maker_you_like"
        get_snack_rule = define_recommend_snack_logic(login_user)
        recommended_snacks = get_snacks_by_rule(get_snack_rule,login_user)
        return Response(recommended_snacks)