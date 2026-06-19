from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


def serialize_user(user):
    return {
        'id': user.id,
        'email': user.email,
        'username': user.get_username(),
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
    }


class AdminLoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '')

        errors = {}
        if not email:
            errors['email'] = 'Email required'
        if not password:
            errors['password'] = 'Password required'
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email__iexact=email).first()
        if not user:
            return Response({'detail': 'Invalid login'}, status=status.HTTP_400_BAD_REQUEST)

        authenticated_user = authenticate(
            request,
            username=user.get_username(),
            password=password,
        )

        if not authenticated_user:
            return Response({'detail': 'Invalid login'}, status=status.HTTP_400_BAD_REQUEST)

        if not (authenticated_user.is_staff or authenticated_user.is_superuser):
            return Response(
                {'detail': 'Only admin users can access this panel'},
                status=status.HTTP_403_FORBIDDEN,
            )

        login(request, authenticated_user)
        return Response({'user': serialize_user(authenticated_user)})


class AdminLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'detail': 'Logged out'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class AdminMeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        if not (user.is_staff or user.is_superuser):
            return Response(
                {'detail': 'Only admin users can access this panel'},
                status=status.HTTP_403_FORBIDDEN,
            )
        return Response({'user': serialize_user(user)})
