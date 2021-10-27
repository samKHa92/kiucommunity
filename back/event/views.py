from django.shortcuts import render
from .models import Event
from .serializers import EventSerializer
from rest_framework import mixins
from rest_framework import viewsets

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer