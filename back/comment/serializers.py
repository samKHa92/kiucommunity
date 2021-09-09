from rest_framework import serializers
from .models import Comment
from rest_framework.authtoken.views import Token

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'user_id',
             'text' ,
             'likes', 
             "post_id",
             "image1", 
               ]

