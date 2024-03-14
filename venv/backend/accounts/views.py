from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Account
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

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


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # try auth
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # when success, return token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # when failed, return error
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

