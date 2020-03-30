from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='blog-home'),
    path('api/blog/', views.PostListCreate.as_view() ),
]
