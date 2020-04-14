from django.urls import path
from rest_framework import routers
from . import views
from .api import Posts

urlpatterns = []

router = routers.DefaultRouter()
router.register('api/posts', Posts, 'posts')

urlpatterns += router.urls
