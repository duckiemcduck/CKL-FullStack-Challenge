# README #

Blog API with Django+PostgreSQL+nginx orchestrated with Docker v17.0.5 CE and docker-compose v 1.13.0
for the CKL Backend challenge.

New: Includes a crawler service that scrapes Articles, Subjects and Authors from [infowars.com](https://www.infowars.com/).

# Setting up

1. Install Docker and docker-compose.
2. Clone this repository locally.
3. Run `docker-compose up` in the containing folder.

If on Linux, it should be listening at http://localhost:80 .
If on docker-machine, and consequently on Windows, it will run off the docker-machine's address (usually http://192.168.99.100 ) on port `80`.

## General Information 

nginx is set up to proxy pass at root (`'/'`), which gateways to a docker contained service host named `proxy` at port `8080`. 
If this proxy service is not available, accessing root will return a 502 code. 

Django's views (like http://localhost/api/v1/authors ) should remain accessible regardless of the front-end proxy's state.

The credentials for http://localhost/admin are reset every time the container is restarted, using the WEB_ADMIN variables in env/web.env for its credentials.
Default access credentials for the admin panel are:

1. username: admin
2. password: cheesecake

The crawler service scrapes after the most recent articles in each category, comparing them with articles already in Blog's PostgreSQL database, inserting them into it if not. After the initial scrape, it checks the news frontpage every 30 minutes.

The Article API (http://localhost/api/v1/articles) should offer 6 articles per page.



