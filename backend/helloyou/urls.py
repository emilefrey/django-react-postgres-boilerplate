from django.urls import path
import helloyou.views as views

urlpatterns = [
    path('helloyou/', views.HelloYouView.as_view(), name = 'helloyou'),
]