# Generated by Django 3.2.5 on 2021-09-09 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_post_gang'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image1',
            field=models.ImageField(default='media/defaultprof.png', upload_to='postimgs'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image2',
            field=models.ImageField(default='media/defaultprof.png', upload_to='postimgs'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image3',
            field=models.ImageField(default='media/defaultprof.png', upload_to='postimgs'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image4',
            field=models.ImageField(default='media/defaultprof.png', upload_to='postimgs'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image5',
            field=models.ImageField(default='media/defaultprof.png', upload_to='postimgs'),
        ),
    ]
