from django.shortcuts import render
from .models import Book
from .serializers import BookSerializer
from rest_framework import mixins
from rest_framework import viewsets

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer