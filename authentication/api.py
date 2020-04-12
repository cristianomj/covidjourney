from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, SignUpSerializer, SignInSerializer


class UserApi(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user


class SignUpApi(generics.GenericAPIView):
  serializer_class = SignUpSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    _, token = AuthToken.objects.create(user)

    newUser = UserSerializer(user, context=self.get_serializer_context()).data
    current_site = get_current_site(request)

    message = render_to_string('email_verification.html', {
        'username': newUser['username'],
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(newUser['id'])),
        'token': urlsafe_base64_encode(force_bytes(token))
    })

    send_mail(
        'Please verify your account',
        message,
        'noreply@coronavirusjourney.com',
        [request.data['email']],
        fail_silently=False,
    )

    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })


class SignInApi(generics.GenericAPIView):
  serializer_class = SignInSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })


class VerifyUserApi(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        uid = urlsafe_base64_decode(request.data['uid']).decode()
        user = User.objects.get(id=uid)
        user.is_active = True
        user.save()

        return Response({})
