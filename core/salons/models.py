from django.db import models


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
    website = models.CharField(max_length=255)  # public URL
    admin_url = models.CharField(max_length=255, blank=True)

    owner = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    renewal_date = models.DateField()
    subscription = models.CharField(max_length=10, choices=PLAN_CHOICES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)

    created = models.DateField(auto_now_add=True)
    expires = models.DateField()

    #  CONTROL FLAGS
    is_running = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Activity(models.Model):
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name="activities")
    title = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return self.title    