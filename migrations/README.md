# Migrations

Create a new migration script:

`npx sanity migration create migration-name`

## Development

### Dry run migrations in development

`npx sanity migration run migration-name --project bk8rw7yi --dataset development`

### Run migrations in development

Create a backup of the development dataset before running the migrations. See `backup-sanity.md`.

`npx sanity migration run migration-name --project bk8rw7yi --dataset development --no-dry-run`

## Production

### Dry run the migrations in production

`npx sanity migration run migration-name --project bk8rw7yi --dataset production`

### Run migrations in production

`npx sanity migration run migration-name --project bk8rw7yi --dataset production --no-dry-run`
