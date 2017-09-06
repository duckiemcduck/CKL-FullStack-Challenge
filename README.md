# About Creepy_Crawly #

This is my take on the CheesecakeLabs' Full-stack challenge.

The challenge required participants to:
 * Create a Single Page Application with React.js/Redux.js that displays and filters through news subjects from an external feed, it should precisely follow the provided mockups;
 * Insert the article contents; hero pictures, subjects, authors, author profile pictures, dates and links from the external news website into a Database;
 * Serve the contents from the Database to the front-end app through a RESTful API; 
 * Configure an user-friendly admin panel that allows manual insertion of articles, authors and their respective hero images;
 * Use a virtual environment (either virtualenv or Docker)

> The Back-End portion of the challenge utilizes Django+PostgreSQL+nginx 

> The Front-End portion of the challenge utilizes Webpack+Express.js+React.js+Redux.js 

> The crawler service for the news website utilizes BeautifulSoup4 and psycopg2 to seek, identify and insert articles from http://infowars.com into the PostgreSQL database. _This is functional as long as their website layout remains the same (as of 08/31/2017)._

The FullStack is orchestrated with Docker v17.0.5 CE and docker-compose v 1.13.0.

A preview of the stack with its crawler service running can be seen here:
![https://i.imgur.com/eONDCQr.gif](https://i.imgur.com/eONDCQr.gif)

The layout is also [responsive](https://i.imgur.com/vDA8VZi.gif).

# Setting up

Despite being a reasonably sized project, its deployment is fairly simple:

1. Install Docker and docker-compose.
2. Clone this repository locally.
3. Run `docker-compose up` in the containing folder.

If on Linux, it should be listening at http://localhost . 

If on docker-machine, and consequently on Windows, you will have to change `WIN_HOST` in the [docker-compose.yml](https://github.com/duckiemcduck/CKL-FullStack-Challenge/blob/master/docker-compose.yml#L68) file to `1`. This will have it run off the docker-machine's address (usually http://192.168.99.100 ) on port `80`.

>The reason for this is that yarn struggles to perform the links to binary module files under a machine in a Windows volume, so extra steps are taken and different commands are used.

## General Information 

The crawler service scrapes after the most recent articles in each category, comparing them with articles already in the PostgreSQL database, inserting them into it if not. After the initial scrape, it checks the news frontpage every 30 minutes.

That said, the service does not need the crawler to function. Its entry may be removed from the docker-compose.yml script if desired, and article entries may be input manually.

The credentials for the admin panel at http://localhost/admin are reset every time the container is restarted, using the WEB_ADMIN variables in env/web.env for its credentials.
Default access credentials for the admin panel are:

1. username: admin
2. password: cheesecake

*The repository does not accompany default images.* These may be added/modified through the admin panel.

If for whatever reason you'd like to look at the commit history and development process, you may look through the original BitBucket repositories:

https://bitbucket.org/duckiemcduck/ckl1_backend_lucas_bandeira

https://bitbucket.org/duckiemcduck/ckl1_frontend_lucas_bandeira

Access the individual stack folders for more details on each respective end of the challenge.
