#! /bin/bash
export DOLLAR='$'
envsubst < /code/webserver/backend.tmpl > /etc/nginx/nginx.conf

nginx -g "daemon off;"
