from rest_framework import serializers
from .models import Gang
# from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class GangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gang
        fields = [
            'id',
            'user_quantity',
             'name' ,
             "description",
             "gang_image",
               ]

