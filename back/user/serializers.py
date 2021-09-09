from rest_framework import serializers
from .models import User
from rest_framework.authtoken.views import Token

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User 
		fields = [
			'id',
			'email',
			'username',
			'name',
            'lastname',
			'password',
			'mobile',
			"badge_id",
			"room",
			"gang",
			"profile_picture",
			"status"
		]

		# setting password kwargs
		extra_kwargs = {'password':{
			'write_only': True,
			'required': True
		}}

	# method to generate a token for the new user
	def create(self, validated_data):
		user = User.objects.create_user(**validated_data)
		Token.objects.create(user = user)
		return user