## Configuration

Copy the file `.env.template` into the file `.env` and change the parameters to the proper ones.

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