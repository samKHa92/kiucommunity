# Generated by Django 3.2.5 on 2021-09-09 20:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_auto_20210909_1854'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='likes',
            new_name='reacts',
        ),
    ]