from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('post/<id>', views.blogPost, name='blogPost'),
    path('signup', views.signUp, name='signUp'),
    path('signin', views.signIn, name='signUp'),
    path('verify/<uid>/<token>', views.verify, name='verify'),
    path('details', views.details, name='detais'),
    path('profile', views.details, name='profile'),
]
