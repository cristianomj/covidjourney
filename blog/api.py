from blog.models import Post
from rest_framework import viewsets, permissions
from .serializers import PostSerializer

# class PostViewSet(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.AllowAny
#     ]
#
#     serializer_class = PostSerializer
#
#     def get_queryset(self):
#         return self.request.user.blog.all()
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PostSerializer
