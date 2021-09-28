from django.db import models

class Comment(models.Model):
    user_id = models.CharField(max_length=50, default="samKHa")
    post_id = models.CharField(max_length=50, default="1")
    text = models.TextField()
    def __str__(self):
        return self.text
    
