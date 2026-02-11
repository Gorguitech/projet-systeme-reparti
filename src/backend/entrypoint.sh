#!/bin/sh
set -e

echo " Attente de PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 1
done

echo " Migrations..."
python manage.py migrate

echo "Collect static..."
python manage.py collectstatic --noinput

echo "Création superuser si absent..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser(
        "admin",
        "admin@example.com",
        "admin123"
    )
EOF

echo " Lancement Gunicorn"
exec gunicorn backend_api.wsgi:application --bind 0.0.0.0:8000 --workers 3
