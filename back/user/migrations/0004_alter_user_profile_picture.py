# Generated by Django 3.2.5 on 2021-09-11 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20210909_2015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.FileField(default='media/defaultprof.png', upload_to='profileimgs'),
        ),
    ]
