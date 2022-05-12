# [Liste di Proscrizione](https://it.wikipedia.org/wiki/Proscrizione_sillana) (blacklisting service)

## Setup

For local builds you need to have docker installed, then launch the command `docker compose up --build` to launch the service the first time. After the first time you can use simply the command `docker compose up`.

## Building

Since the project is written in typescript, to see the changes in the container you will have to compile the typescript first.
You can do it with the command:

```sh
npm run build
```

and, if you want to start the container after the build, you can use the command:

```sh
docker compose up --build
```

To do both action at the same time there is the custom command:

```sh
npm run showtime
```

which runs `npm run build && docker compose up --build`.

## Migrations

The migrations are provided by [db-migrate](https://db-migrate.readthedocs.io/en/v0.10.x/). In order to function db-migrate need a `database.json` file in the root directory.
The `database.json` file should contain the info of the database to use for production, testing and dev. Here is an example of the definition of the dev environmant in database.json:

```json
  "dev": {
    "driver": "pg",
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" },
    "host": { "ENV": "POSTGRES_SERVICE" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB" }
  }
```

If there is a `.env` file in the root directory, db-migrate will automatically read the env variables from it, even if you don't have dotenv installed.

### Create a new migration

To create a new migration use the command:

```sh
npx db-migrate create NAME_OF_MIGRATION --sql-file
```

This script will create a migrations dir (if it doesn't already exists) in the project's root folder, inside it it will place a script that will run the migrations you specify in the sql files (that are generated and placed automatically inside the migrations/sqls dir).

If you prefere to use another language (such as js) to write the migrations, don't add `--sql-file` at the end of the command.

That's it, now have fun writing the `up` and `down` migrations in your brand-new sqls files.

### Run a migration

To run all the migrations at once use the command

```sh
npx db-migrate up
```

This will run all the up migrations you defined. If you want to run the down migrations simply edit the command and write up instead of down (_duh!_).

If you prefere to run a specific migration, add the name of it at the end of the command:

```sh
npx db-migrate up init
```

Will run all the up migrations you defined with the name init.

## Fastify

The service uses [fastify](https://www.fastify.io/) (here a handy [cheat sheet](https://devhints.io/fastify) for those in a hurry) to handle the requests.
The requestes implemented are:

- GET /test: this one returns a hello friends string, just to test the server is running correctly;
- GET /blacklist: this one returns all the entry of the _liste_di_proscrizione_ table;
- GET /find: this one searches the db by email address;
- POST /blacklist: this one adds a new entry into the _liste_di_proscrizione_ table;
- PATCH /: this one changes the is_blocked column of the entry whose id is passed in the params;
- DELETE /: this one deletes the entry whose id is passed in the params.

## Node-postgres

To connect to the postgres db in order to make the queries I used the pg package.
Here is the [official repo](https://github.com/brianc/node-postgres).
Here is the [documentation I used](https://node-postgres.com/features/connecting).

## Nodemon

Since the project is written in typescript, we miss the ability to hot-refresh the docker build at every save to instantly see the changes we made; we need instead to stop the container, build the typescript and then start the container again.
Boooooooring.
With nodemon we can write code and immediatly see the changes applied. Thanks nodemon.

### Usage
