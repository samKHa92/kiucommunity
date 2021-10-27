from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    cover_image = models.FileField(upload_to="covers", default = "media/defaultprof.png")
    start_date = models.DateField(default=00.00)
    def __str__(self):
        return self.name
    
