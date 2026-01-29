from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from .models import About, Skill, Project, Experience, Education, Contact, SocialLink


def home(request):
    """Home page view - displays hero section and summary"""
    about = About.objects.first()
    featured_projects = Project.objects.filter(featured=True)[:3]
    social_links = SocialLink.objects.all()
    
    context = {
        'about': about,
        'featured_projects': featured_projects,
        'social_links': social_links,
    }
    return render(request, 'portfolio/home.html', context)


def about_view(request):
    """About page view"""
    about = About.objects.first()
    skills = Skill.objects.all()
    social_links = SocialLink.objects.all()
    
    # Group skills by category
    skills_by_category = {}
    for skill in skills:
        if skill.category not in skills_by_category:
            skills_by_category[skill.category] = []
        skills_by_category[skill.category].append(skill)
    
    context = {
        'about': about,
        'skills': skills,
        'skills_by_category': skills_by_category,
        'social_links': social_links,
    }
    return render(request, 'portfolio/about.html', context)


def projects_view(request):
    """Projects page view"""
    projects = Project.objects.all()
    
    context = {
        'projects': projects,
    }
    return render(request, 'portfolio/projects.html', context)


def project_detail(request, pk):
    """Individual project detail view"""
    project = get_object_or_404(Project, pk=pk)
    
    context = {
        'project': project,
    }
    return render(request, 'portfolio/project_detail.html', context)


def experience_view(request):
    """Experience and education page view"""
    experiences = Experience.objects.all()
    education = Education.objects.all()
    
    context = {
        'experiences': experiences,
        'education': education,
    }
    return render(request, 'portfolio/experience.html', context)


def contact_view(request):
    """Contact page view with form handling"""
    about = About.objects.first()
    social_links = SocialLink.objects.all()
    
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()
        
        if name and email and subject and message:
            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
            return redirect('contact')
        else:
            messages.error(request, 'Please fill in all fields.')
    
    context = {
        'about': about,
        'social_links': social_links,
    }
    return render(request, 'portfolio/contact.html', context)
