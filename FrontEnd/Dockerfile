FROM node:6.9.5-alpine
RUN mkdir -p /usr/src/app
COPY . usr/src/app
WORKDIR usr/src/app

RUN npm install -g -s --no-progress yarn

EXPOSE 8080

CMD ["yarn","serve"]

