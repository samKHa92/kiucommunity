from django.urls import path, include
from .views import EventViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', EventViewSet)

urlpatterns = router.urls