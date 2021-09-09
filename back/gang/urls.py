from django.urls import path, include
from .views import GangViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', GangViewSet)

urlpatterns = router.urls