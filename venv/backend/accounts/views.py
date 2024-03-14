from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Account
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate,login,logout
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class CreateAccountAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if Account.objects.filter(username=username).exists():
            return Response({'error': 'Username must be unique.'}, status=status.HTTP_400_BAD_REQUEST)
        
        account = Account(username=username)
        account.set_password(password)
        account.save()
        
        return Response({'message': 'Account created successfully.'}, status=status.HTTP_201_CREATED)


class SignUpAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if Account.objects.filter(username=username).exists():
            return Response({'error': 'Username must be unique.'}, status=status.HTTP_400_BAD_REQUEST)
        
        account = Account(username=username)
        account.set_password(password)
        account.save()
        
        # Automatically log in the user after account creation
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'account': {'id': account.id, 'username': account.username}, 'token': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Failed to authenticate the new user.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # try auth
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # when success, return token
            account = Account.objects.get(username=username)
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'account':{'id':account.id,'username':account.username},'token': token.key}, status=status.HTTP_200_OK)
        else:
            # when failed, return error
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        token = request.headers.get('token')

        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        user = token_obj.user
        logout(request)
        token_obj.delete()

        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)

