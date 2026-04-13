from django.contrib import admin
from .models import Salon, Client, Activity

admin.site.register(Salon)
admin.site.register(Client)   # ✅ THIS IS WHAT YOU MISSED
admin.site.register(Activity)