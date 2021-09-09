from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer
from rest_framework import mixins
from rest_framework import viewsets

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer