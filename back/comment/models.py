from django.db import models

class Comment(models.Model):
    user_id = models.CharField(max_length=50, default="samKHa")
    post_id = models.CharField(max_length=50, default="1")
    text = models.TextField()
    likes = models.IntegerField(default=0)
    image1 = models.ImageField(upload_to="commentimgs", default = "media/defaultprof.png")

    def __str__(self):
        return self.text
    
