from django.db import models

class Reaction(models.Model):
    sender = models.CharField(max_length=50, default="samKHa")
    post_id = models.IntegerField(default=7)
    react_type = models.CharField(max_length=10, default="Like")

    def __str__(self):
        return self.react_type
    
