# SkydropX Developer Challenge - Shipping API
Objetivo: construir una API con Rails que sea capaz de importar y validar los datos de los envíos desde un archivo CSV de manera asíncrona.


Documentation: https://skydropx-challenge.herokuapp.com/docs/

Use bearer toke: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjQyNTU4MjgxLCJleHAiOjE2NDc3NDIyODF9.-zR7xYadU-QsHAzHZ88NSOqxhQnArqz-PFkh8sMFK-o"

Generate new authorization token: POST - /auth
Body: {
 username: "test",
 password: "test"
}
## Start

Clone the repo:
```sh
git clone https://github.com/a-bianchi/shipping-api.git
cd shipping-api
```

Install dependencies:
```sh
npm install
or
yarn install
```

Set environment (vars):
```sh
cp .env.example .env
```

Start server:
```sh
# Start server
npm run dev
or
yarn run dev
```

Tests:
```sh
# Run tests written in ES6 
npm run test
or
yarn run test
```

Build server code:
```sh
# Wipe out build directory
npm run build
or
yarn run build
# Clean build directory.
npm run clean
or
yarn run build
```

##### Deployment

```sh
# compile
1. yarn run build

# upload dist/ to your server
2. scp -rp build/ user@dest:/path

# install production dependencies only
3. npm --production

# Use any process manager to start your services
4. pm2 start build/index.js
```
## Database Diagram
<img src="https://github.com/a-bianchi/shipping-api/blob/master/docs/diagram.png" width= 300 />

## Configuration

Copy the file `.env.template` into the file `.env` and change the parameters to the proper ones.

In posgresql before running migrations run the following query
```sh
create extension "uuid-ossp";
```

## Database migrations

The migrations are stored in the directory `src/db/migrations` with the following format per file:<br>
`yyyyMMddHHmmss-some-description.js`

The scripts for special cases (like the initial dump) are stored in the directory `scripts`.

### Create blank migration

```
$ npx sequelize-cli migration:generate --name migrationName
```

### Run migrations

**Make Sure to transpile the scripts before running migrations** `npm run build`

`Package.json` includes some scripts to avoid transpiling and executing sequelize manually every time.

Run all migrations up until the last one:

```
$ npm run migrate
```

Revert the last ran migration:

```
$ npm run migrate:undo
```

Revert to a specific migration:

```
$ npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

## Database seeds

### Create Seed

```
npx sequelize-cli seed:generate --name demo-user
```

### Running Seeds

```
npx sequelize-cli db:seed:all
```

### Undoing Seeds

Seeders can be undone if they are using any storage. There are two commands available for that:

If you wish to undo the most recent seed:

```
npx sequelize-cli db:seed:undo
```

If you wish to undo a specific seed:

```
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
```

If you wish to undo all seeds:

```
npx sequelize-cli db:seed:undo:all
```