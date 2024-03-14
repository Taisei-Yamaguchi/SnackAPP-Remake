from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Account

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
