# Generated by Django 3.2.5 on 2021-09-09 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_auto_20210909_1139'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='title',
        ),
        migrations.AddField(
            model_name='post',
            name='date_posted',
            field=models.CharField(default='00.00.0000 | 00:00', max_length=30),
        ),
    ]