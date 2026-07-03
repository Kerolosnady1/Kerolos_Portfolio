import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
user = User.objects.get(username='kerolos')
user.set_password('kerolos')
user.save()

print('✓ Admin password set successfully!')
print('Username: kerolos')
print('Password: kerolos')
