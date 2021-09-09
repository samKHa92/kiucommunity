# Generated by Django 3.2.5 on 2021-09-09 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('username', models.CharField(default='Username123', max_length=50, unique=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('badge_id', models.CharField(default='000', max_length=10)),
                ('room', models.CharField(default='E302', max_length=5)),
                ('status', models.CharField(default='Student', max_length=50)),
                ('profile_picture', models.ImageField(default='media/defaultprof.png', upload_to='profileimgs')),
                ('name', models.CharField(default='Name', max_length=50)),
                ('lastname', models.CharField(default='LName', max_length=50)),
                ('mobile', models.CharField(default='111111111', max_length=9)),
                ('gang', models.CharField(default='None', max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
