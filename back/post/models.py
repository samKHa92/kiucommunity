from django.db import models

class Post(models.Model):
    user_id = models.CharField(max_length=50, default="samKHa")
    title = models.CharField(max_length=50)
    description = models.TextField()
    likes = models.IntegerField(default=0)
    gang = models.CharField(default="None", max_length=50)
    image1 = models.ImageField(upload_to="postimgs", default = "media/defaultprof.png")
    image2 = models.ImageField(upload_to="postimgs", default = "media/defaultprof.png")
    image3 = models.ImageField(upload_to="postimgs", default = "media/defaultprof.png")
    image4 = models.ImageField(upload_to="postimgs", default = "media/defaultprof.png")
    image5 = models.ImageField(upload_to="postimgs", default = "media/defaultprof.png")

    def __str__(self):
        return self.title
    
