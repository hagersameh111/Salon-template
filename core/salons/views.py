from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.utils.timezone import now
from datetime import timedelta

from .models import Salon, Activity
from .serializers import SalonSerializer


class SalonViewSet(ModelViewSet):
    queryset = Salon.objects.select_related("client").prefetch_related("activities")  # ✅ OPTIMIZED
    serializer_class = SalonSerializer

    def apply_control_logic(self, salon):
        if salon.status in ["Suspended", "Expired", "Deleted"]:
            salon.is_running = False
            if not salon.deactivated_at:
                salon.deactivated_at = now()
        else:
            salon.is_running = True
            salon.deactivated_at = None

        salon.save()

    def perform_update(self, serializer):
        salon = serializer.save()

        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title=f"Status changed to {salon.status}",
            date=now().date()
        )

    @action(detail=True, methods=["post"])
    def activate(self, request, pk=None):
        salon = self.get_object()

        salon.status = "Active"
        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title="Activated",
            date=now().date()
        )

        return Response({"message": "Salon activated"})

    @action(detail=True, methods=["post"])
    def suspend(self, request, pk=None):
        salon = self.get_object()

        salon.status = "Suspended"
        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title="Suspended",
            date=now().date()
        )

        return Response({"message": "Salon suspended"})

    @action(detail=True, methods=["post"])
    def toggle(self, request, pk=None):
        salon = self.get_object()

        salon.status = "Suspended" if salon.status == "Active" else "Active"
        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title=f"Toggled to {salon.status}",
            date=now().date()
        )

        return Response({"status": salon.status})

    @action(detail=True, methods=["post"])
    def renew(self, request, pk=None):
        salon = self.get_object()

        plan = request.data.get("plan")

        months_map = {
            "3M": 3,
            "6M": 6,
            "9M": 9,
            "12M": 12
        }

        months = months_map.get(plan, 3)

        salon.subscription = plan
        salon.status = "Active"
        salon.expires = now().date() + timedelta(days=30 * months)

        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title=f"Renewed for {plan}",
            date=now().date()
        )

        return Response({"expires": salon.expires})

    @action(detail=True, methods=["post"])
    def extend(self, request, pk=None):
        salon = self.get_object()

        salon.expires += timedelta(days=30)
        salon.save()

        Activity.objects.create(
            salon=salon,
            title="Extended 1 month",
            date=now().date()
        )

        return Response({"expires": salon.expires})

    @action(detail=True, methods=["post"])
    def deactivate(self, request, pk=None):
        salon = self.get_object()

        salon.status = "Expired"
        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title="Deactivated",
            date=now().date()
        )

        return Response({"message": "Salon deactivated"})

    @action(detail=True, methods=["post"])
    def soft_delete(self, request, pk=None):
        salon = self.get_object()

        salon.status = "Deleted"
        self.apply_control_logic(salon)

        Activity.objects.create(
            salon=salon,
            title="Deleted",
            date=now().date()
        )

        return Response({"message": "Marked deleted"})

    @action(detail=True, methods=["delete"])
    def hard_delete(self, request, pk=None):
        salon = self.get_object()
        salon.delete()

        return Response({"message": "Permanently deleted"})

    @action(detail=False, methods=["get"])
    def stats(self, request):
        return Response({
            "total": Salon.objects.count(),
            "active": Salon.objects.filter(status="Active").count(),
            "suspended": Salon.objects.filter(status="Suspended").count(),
            "expired": Salon.objects.filter(status="Expired").count(),
        })

    @action(detail=False, methods=["post"])
    def bulk_update(self, request):
        ids = request.data.get("ids", [])
        action_type = request.data.get("action")

        salons = Salon.objects.filter(id__in=ids)

        for salon in salons:
            salon.status = action_type
            self.apply_control_logic(salon)

            Activity.objects.create(
                salon=salon,
                title=f"Bulk updated to {action_type}",
                date=now().date()
            )

        return Response({"message": "Bulk update done"})


@api_view(["GET"])
def get_salon_by_domain(request):
    domain = request.GET.get("domain")

    if not domain:
        return Response({"error": "Domain required"}, status=400)

    domain = domain.lower().replace("https://", "").replace("http://", "").replace("www.", "")

    try:
        salon = Salon.objects.get(website__in=[domain, f"www.{domain}"])

        return Response({
            "id": salon.id,
            "is_running": salon.is_running,
            "status": salon.status,
            "expires": salon.expires,
        })

    except Salon.DoesNotExist:
        return Response({"error": "Not found"}, status=404)