from django.urls import path, include
from .api import SignUpApi, SignInApi, UserApi
from knox import views as knox_views

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/signup', SignUpApi.as_view()),
  path('api/auth/signin', SignInApi.as_view()),
  path('api/auth/user', UserApi.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
