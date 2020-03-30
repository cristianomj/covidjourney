from .models import Post
from .serializers import PostSerializer
from rest_framework import generics

from django.shortcuts import render
from django.http import HttpResponse

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

def home(request):
    return render(request, 'blog/home.html')
