from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    cover_image = models.FileField(upload_to="covers", default = "media/defaultprof.png")
    book_file = models.FileField(upload_to="books", default = "media/defaultprof.png")
    def __str__(self):
        return self.name
    
