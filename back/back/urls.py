from django.contrib import admin
from django.urls import path, include
from user.views import UserViewSet 
import user.urls as u

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(u)),
]
