from django.urls import path
from . import views

urlpatterns = [
    path('api/blog/', views.PostListCreate.as_view() ),
]
