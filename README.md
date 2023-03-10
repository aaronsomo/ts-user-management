# Instructions to run locally:

## Installation:
1. git clone
2. cd into root project direction
3. run `npm install`

## Setup:
1. cd into root project direction
2. run `docker compose up`
3. log into container:
    - run `docker ps` and copy the container ID
    - run `docker exec -it <container ID> bash`
4. open postgres terminal:
    - run `psql -h localhost -p 5432 -U postgres -W` from docker container command line
    - enter password `postgres`
5. run model.sql SQL commands within postgres terminal of the container
    - `DROP DATABASE IF EXISTS users;`
    - `CREATE DATABASE users;`
    - `\c users;`
    - `CREATE TABLE users (id SERIAL PRIMARY KEY, name varchar(255), email varchar(255), dob varchar(255));`

## Starting app:
1. run `npm run dev`

## Testing app:
1. make sure `app.listen()` is commented in `src/index.ts`, as this will trigger an EADDRINUSE error (to debug, but time constraints)
2. run `npx jest` or `npm run test`
