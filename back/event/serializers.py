from rest_framework import serializers
from .models import Event
# from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
             'name' ,
             "description",
             "cover_image",
             "start_date"
               ]

