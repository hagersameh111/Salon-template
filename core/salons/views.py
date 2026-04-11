from rest_framework.viewsets import ModelViewSet
from django.utils.timezone import now
from .models import Salon
from .serializers import SalonSerializer
from .models import Activity


class SalonViewSet(ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer

    def perform_update(self, serializer):
        salon = serializer.save()

        #  AUTO CONTROL
        if salon.status in ["Suspended", "Expired", "Deleted"]:
            salon.is_running = False
        else:
            salon.is_running = True

        salon.save()

    def perform_update(self, serializer):
        salon = serializer.save()

        Activity.objects.create(
           salon=salon,
           title=f"Status changed to {salon.status}",
           date=now().date()
        )   