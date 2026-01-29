from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about_view, name='about'),
    path('projects/', views.projects_view, name='projects'),
    path('projects/<int:pk>/', views.project_detail, name='project_detail'),
    path('experience/', views.experience_view, name='experience'),
    path('contact/', views.contact_view, name='contact'),
]
