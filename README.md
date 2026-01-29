# Portfolio Website - Django

A full-stack portfolio website built with Django, MySQL, vanilla JavaScript, semantic HTML, and CSS.

## Features

- **Home Page**: Hero section with featured projects
- **About Page**: Personal information, bio, and skills with progress bars
- **Projects Page**: Showcase of projects with filtering functionality
- **Experience Page**: Timeline of work experience and education
- **Contact Page**: Contact form with validation
- **Admin Panel**: Django admin for content management
- **Responsive Design**: Mobile-friendly layout
- **Semantic HTML**: Accessible markup
- **Vanilla JavaScript**: No frameworks, pure JavaScript

## Tech Stack

- **Backend**: Django 4.2
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Image Handling**: Pillow

## Prerequisites

- Python 3.8 or higher
- MySQL Server 5.7 or higher
- pip (Python package manager)

## Installation

### 1. Clone the repository (or use the existing folder)

```bash
cd e:\Kerolos_Portfolio
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/Mac:**

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure MySQL Database

Create a MySQL database:

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update database settings in `portfolio_project/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'portfolio_db',
        'USER': 'your_mysql_username',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 6. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create a superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 8. Collect static files

```bash
python manage.py collectstatic --noinput
```

### 9. Run the development server

```bash
python manage.py runserver
```

Visit http://127.0.0.1:8000/ to view the website.

## Admin Panel

Access the admin panel at http://127.0.0.1:8000/admin/ to manage content:

- **About**: Personal information and bio
- **Skills**: Add and manage skills with proficiency levels
- **Projects**: Add projects with images, descriptions, and links
- **Experience**: Work experience entries
- **Education**: Educational background
- **Contact**: View contact form submissions
- **Social Links**: Social media links

## Project Structure

```
Kerolos_Portfolio/
│
├── portfolio_project/          # Main project settings
│   ├── __init__.py
│   ├── settings.py            # Django settings
│   ├── urls.py                # Main URL configuration
│   ├── wsgi.py
│   └── asgi.py
│
├── portfolio/                 # Portfolio app
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py              # Admin panel configuration
│   ├── apps.py
│   ├── models.py             # Database models
│   ├── views.py              # View functions
│   └── urls.py               # App URL configuration
│
├── templates/                # HTML templates
│   ├── base.html            # Base template
│   └── portfolio/
│       ├── home.html
│       ├── about.html
│       ├── projects.html
│       ├── project_detail.html
│       ├── experience.html
│       └── contact.html
│
├── static/                   # Static files
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       ├── main.js          # Main JavaScript
│       ├── projects.js      # Projects page script
│       └── contact.js       # Contact form script
│
├── media/                    # User uploaded files (created automatically)
│   ├── profile/
│   ├── projects/
│   └── resume/
│
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Adding Content

1. Start the development server
2. Go to http://127.0.0.1:8000/admin/
3. Log in with your superuser credentials
4. Add content using the admin interface:
   - Add your About information (name, title, bio, profile image)
   - Add skills with categories and proficiency levels
   - Add projects with images, descriptions, and links
   - Add work experience and education
   - Add social media links

## Customization

### Colors and Styling

Edit `static/css/style.css` and modify the CSS variables at the top:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  /* ... other variables ... */
}
```

### Database Configuration

For production, update `DATABASES` in `portfolio_project/settings.py` with your production database credentials.

### Security Settings

For production deployment:

1. Change `SECRET_KEY` in `settings.py`
2. Set `DEBUG = False`
3. Update `ALLOWED_HOSTS` with your domain
4. Configure proper static/media file serving
5. Use environment variables for sensitive data

## Common Issues

### mysqlclient installation error

If you encounter issues installing mysqlclient on Windows, you may need to:

1. Install Visual C++ Build Tools
2. Or use an alternative: `pip install pymysql` and add to `settings.py`:
   ```python
   import pymysql
   pymysql.install_as_MySQLdb()
   ```

### Port already in use

If port 8000 is already in use, run on a different port:

```bash
python manage.py runserver 8080
```

### Static files not loading

Make sure to run:

```bash
python manage.py collectstatic
```

## Development Tips

- Use `python manage.py makemigrations` after changing models
- Use `python manage.py shell` for interactive Python shell
- Use `python manage.py dbshell` for database shell
- Check for issues: `python manage.py check`

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please refer to Django documentation: https://docs.djangoproject.com/
