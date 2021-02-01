from rest_auth.views import (LoginView, LogoutView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated   

# Create your views here.
class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class APILoginView(LoginView):
    pass

class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                response = {
                    'data': [{'status': 'The old password is incorrect.'}]
                }
                return Response({"old_password": ["The old password you provided is incorrect."]}, status=status.HTTP_400_BAD_REQUEST)
            new_password1 = serializer.data.get('new_password1')
            new_password2 = serializer.data.get('new_password2')
            if new_password1 != new_password2:
                return Response({"error": ["Passwords do not match."]})
            # set_password also hashes the password that the user will get
            self.object.set_password(new_password1)
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': [{'status': 'Password updated successfully!'}]
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)