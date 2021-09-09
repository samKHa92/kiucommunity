from rest_framework import serializers
from .models import Post
# from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'user_id',
             'title' ,
             'likes', 
             "description",
             "gang",
             "image1", 
             "image2",
             "image3",
             "image4",
             "image5", 
               ]

