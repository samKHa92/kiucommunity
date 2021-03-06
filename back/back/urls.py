from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.urls import path, include
from user.views import UserViewSet 
from rest_framework.authtoken.views import obtain_auth_token

import user.urls as u
import post.urls as p
import comment.urls as c
import reaction.urls as r
import book.urls as b


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(u)),
    path('posts/', include(p)),
    path('reacts/', include(r)),
    path('comments/', include(c)),
    path('books/', include(b)),
    path('auth/', obtain_auth_token),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
