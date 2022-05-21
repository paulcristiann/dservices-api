
# D-Services API Platform

This is the implementation of the backend API for the ICI D-Services application

The project is built using Nest.JS, TypeORM and PostgreSQL.
The projects also uses NPM for package management and  docker to start the development database.

### Project setup

For the development database, you need to have Docker and Docker Compose installed ([Docker installation](https://docs.docker.com/get-docker/)).

After cloning, open the project folder and type into the terminal:
`npm install`

To start the database instance on your local machine, enter:
`./start-db.sh`

The application fetches the docker image and automatically starts the DB.

To verify that your app is correctly configured, run:
`npm run start:dev`

### OpenAPI
The Swagger page can be found by navigating to localhost:3000/api
The development API Key must be set in the header of each request with the key:
`x-api-key`
This test key can be used:
`1fa544cc-39d8-402c-8459-746f994c5400`