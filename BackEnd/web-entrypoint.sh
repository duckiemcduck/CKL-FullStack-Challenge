#!/usr/bin/env bash
echo "Running migrations!"
python manage.py makemigrations creepy_crawly
python manage.py migrate
echo "Recreating django super user now..."
echo "from django.contrib.auth.models import User; import os; User.objects.filter(username='admin').delete(); User.objects.create_superuser(os.environ['WEB_ADMIN_NAME'], os.environ['WEB_ADMIN_EMAIL'], os.environ['WEB_ADMIN_PW'])" | python manage.py shell

if [ ! -d "./backend/static-django" ]; then
	echo "Deploying static django files..."
	python manage.py collectstatic
fi

if [ $PYSVR = "1" ]; then
	python manage.py runserver
else
	uwsgi --socket :8001  --wsgi-file /code/backend/wsgi.py  
fi
