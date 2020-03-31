from django.urls import path
from rest_framework import routers
from . import views
from .api import PostViewSet

# view paths
urlpatterns = [
    path('blog', views.home, name='blog-home'),
]

# api routes
router = routers.DefaultRouter()
router.register('api/posts', PostViewSet, 'posts')

urlpatterns += router.urls
