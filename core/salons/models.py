from django.db import models
from django.utils.timezone import now
from datetime import timedelta


#  CLIENT 
class Client(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    payment_method = models.CharField(max_length=50)
    currency = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.email


#  SALON 
class Salon(models.Model):
    STATUS_CHOICES = [
        ("Active", "Active"),
        ("Suspended", "Suspended"),
        ("Expired", "Expired"),
        ("Deleted", "Deleted"),
    ]

    PLAN_CHOICES = [
        ("3M", "3M"),
        ("6M", "6M"),
        ("9M", "9M"),
        ("12M", "12M"),
    ]

    name = models.CharField(max_length=100)

    # WEBSITE CONTROL
    website = models.CharField(max_length=255)
    admin_url = models.CharField(max_length=255, blank=True)

    # RELATION
    client = models.OneToOneField(
    Client,
    on_delete=models.CASCADE,
    related_name="salon",
    null=True,
    blank=True
)

    owner = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    renewal_date = models.DateField()
    subscription = models.CharField(max_length=10, choices=PLAN_CHOICES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)

    created = models.DateField(default=now)  # 🔥 FIXED (no migration issues)
    expires = models.DateField()

    #  CONTROL FLAGS
    is_running = models.BooleanField(default=True)
    deactivated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

    # AUTO STATUS LOGIC
    def update_status_logic(self):
        if self.status in ["Suspended", "Expired", "Deleted"]:
            self.is_running = False
            if not self.deactivated_at:
                self.deactivated_at = now()
        else:
            self.is_running = True
            self.deactivated_at = None


# ACTIVITY
class Activity(models.Model):
    salon = models.ForeignKey(
        Salon, on_delete=models.CASCADE, related_name="activities"
    )
    title = models.CharField(max_length=100)
    date = models.DateField(default=now)

    def __str__(self):
        return self.title