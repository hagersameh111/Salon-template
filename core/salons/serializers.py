from rest_framework import serializers
from .models import Salon, Activity, Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class SalonSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)  # ✅ FIXED
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Salon
        fields = "__all__"