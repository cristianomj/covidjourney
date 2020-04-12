from django.urls import path
from rest_framework import routers
from . import views
from .api import PostViewSet

urlpatterns = []

router = routers.DefaultRouter()
router.register('api/posts', PostViewSet, 'posts')

urlpatterns += router.urls
