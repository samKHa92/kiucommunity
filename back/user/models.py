from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
	def create_user(self, email, username, mobile, name, lastname, badge_id, room, profile_picture, password=None):
		if not email:
			raise ValueError('User must have email address!')
		if not username:
			raise ValueError('User must have username')
		if not mobile:
			raise ValueError('User must have mobile')
		if not name:
			raise ValueError('User must have name')
		
		user = self.model(
			email=self.normalize_email(email),
			username=username,
			mobile=mobile,
			name=name,
			lastname=lastname,
			badge_id=badge_id,
			room=room,
			profile_picture=profile_picture
		)

		user.set_password(password)
		user.save(using=self._db)
		return user 

	def create_superuser(self, email, username, password, mobile, name, lastname):
		user = self.create_user(
			email = self.normalize_email(email),
			username=username,
			mobile=mobile,
			name=name,
			lastname=lastname,
			password=password,
		)
		user.mobile = mobile
		user.name = name
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user

class User(AbstractBaseUser):
	# django required fields
	email = models.EmailField(verbose_name='email',max_length=60, unique=True)
	username = models.CharField(default = "Username123", max_length=50, unique=True)
	date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
	is_admin = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	badge_id = models.CharField(default="000", max_length=10)
	room = models.CharField(default="E302", max_length=5)
	# additional fields
	profile_picture = models.ImageField(upload_to="profileimgs", default = "media/defaultprof.png")
	name = models.CharField(max_length=50, default = "Name")
	lastname = models.CharField(max_length=50, default = "LName")
	mobile = models.CharField(max_length = 9, default = "111111111")
	gang = models.CharField(max_length=50,default="None")

	# changing default login field from username to email
	USERNAME_FIELD = 'username'

	# required fields for registration
	REQUIRED_FIELDS = ['email','mobile','name', 'lastname']

	# setting the manager class
	objects = UserManager()

	# back representation of object on call
	def __str__(self):
		return self.username

	# django required methods
	def has_perm(self, perm, obj=None):
		return self.is_admin 
	
	def has_module_perms(self, app_label):
		return True