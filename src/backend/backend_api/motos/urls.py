from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MotoViewSet, VendeurViewSet, VenteViewSet

router = DefaultRouter()
router.register(r'motos', MotoViewSet)
router.register(r'vendeurs', VendeurViewSet)
router.register(r'ventes', VenteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]