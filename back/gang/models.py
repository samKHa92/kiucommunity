from django.db import models

class Gang(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    user_quantity= models.IntegerField(default=0)
    gang_image = models.ImageField(upload_to="gangimgs", default = "media/defaultprof.png")
    def __str__(self):
        return self.name
    
