from django.urls import path, include
from .views import ReactionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ReactionViewSet)

urlpatterns = router.urls