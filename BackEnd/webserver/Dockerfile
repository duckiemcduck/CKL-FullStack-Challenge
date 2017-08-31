FROM nginx
RUN mkdir /code
RUN mkdir /webserver
RUN ls /code/

COPY /code/wait-for-it.sh /webserver
COPY /code/webserver-entrypoint.sh /webserver
WORKDIR /webserver
RUN chmod +x /webserver/wait-for-it.sh
RUN chmod +x /webserver/webserver-entrypoint.sh

EXPOSE 80
