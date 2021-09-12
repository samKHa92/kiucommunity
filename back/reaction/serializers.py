from rest_framework import serializers
from .models import Reaction
# from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = [
            'id',
            'sender',
            'post_id' ,
            'react_type', 
               ]

