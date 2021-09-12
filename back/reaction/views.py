from django.shortcuts import render
from .models import Reaction
from .serializers import ReactionSerializer
from rest_framework import mixins
from rest_framework import viewsets

class ReactionViewSet(viewsets.ModelViewSet):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer