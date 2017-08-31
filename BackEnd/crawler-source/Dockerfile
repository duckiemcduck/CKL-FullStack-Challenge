 FROM python:3
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /env
 ADD . /env/
 WORKDIR /env
 RUN pip install -r requirements-container.txt
 RUN chmod +x /env/crawler-entrypoint.sh
 
 EXPOSE 80
