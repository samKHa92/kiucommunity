from django.db import models

class Post(models.Model):
    user_id = models.CharField(max_length=50, default="samKHa")
    description = models.TextField()
    reacts = models.IntegerField(default=0)
    gang = models.CharField(default="None", max_length=50)
    date_posted = models.CharField(default = "00.00.0000 | 00:00", max_length=30)
    image1 = models.ImageField(upload_to="postimgs", default = "media/defaultprof.png")

    def __str__(self):
        return self.user_id
    
