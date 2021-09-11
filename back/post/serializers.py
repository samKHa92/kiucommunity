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
             'date_posted' ,
             'reacts', 
             "description",
             "gang",
             "date_posted",
             "image1", 
               ]

