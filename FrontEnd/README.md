# README #

v1 of the Front-End app done with Webpack+Express.js+React.js+Redux.js orchestrated with Docker v17.0.5 CE and docker-compose v 1.13.0
for the CKL Frontend challenge.

# Setting up

1. Install Docker and docker-compose.
2. Clone this repository locally.
3. Run `docker-compose up` in the containing folder.

If on Linux, it should be listening at http://localhost:8080 .
If on docker-machine, and consequently on Windows, it will run off the docker-machine's address (usually http://192.168.99.100 ) on port `8080`.

## General Information 

Express is set up to serve the app and static files, its main purpose being acting as a proxy for the backend.

The top-level App component and the Navbar are the only 'smart' React.js components, which are aware of Redux, whereas the articles cards and their preloader are 'dumb' components and handle their own states.

The top level App dispatches a state change to Redux to fetch articles for the `articles` and `subjects` prop, that is passed down to the cards (headline-card, featured-card, default-card) and navbar respectively. 

The navbar can dispatch a `changeSubject` action which tells Redux to fetch a new request for articles with the selected subject id.

Redux is set to fetch contents from an API which follows the `/api/v1/articles`, `/api/v1/articles?subject=` and `/api/v1/subjects` formats hosted under the same domain.

Redux is set to fire a 3 second timeout promise before actually fetching content to simulate a delay, allowing for state change and transition observation.

The preloader (lilradio.js) receives a signal from its parent card, merely checking if the main image in the card was loaded or not. If there's no image, it will handle the error by displaying a random loading message, as it is optimistic and acts as if it will eventually receive something.

With exception of the headline card, which acts as a loading screen, other article cards will not be rendered if there are no articles to be found. The application will then hang on a loading screen until there's a success in the article fetch.

CSS packing is handled by a top-level app.css file, which is processed by PostCSS, that imports stylesheets for elements, which are in their respective folders.






