from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('post/<id>', views.blogPost, name='blogPost'),
]
