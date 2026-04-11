from rest_framework import serializers
from .models import Salon, Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class SalonSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Salon
        fields = "__all__"