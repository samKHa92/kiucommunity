from django.shortcuts import render
from .models import Gang
from .serializers import GangSerializer
from rest_framework import mixins
from rest_framework import viewsets

class PostViewSet(viewsets.ModelViewSet):
    queryset = Gang.objects.all()
    serializer_class = GangSerializer