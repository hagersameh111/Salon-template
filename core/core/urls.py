from django.contrib import admin
from django.urls import path, include
from salons.views import get_salon_by_domain

urlpatterns = [
    
    path('admin/', admin.site.urls),

    path('api/salon-by-domain/', get_salon_by_domain),

    path('api/', include('salons.urls')),
]