from rest_framework import serializers
from .models import Book
# from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'id',
             'name' ,
             "description",
             "book_file",
             "cover_image"
               ]

