# Quickstart guide

> Docker is a pre-requisite for this quickstart. Please ensure Docker is installed.

1. Add the following environment variables to a `.env.local` file in the project root:

```
NODE_ENV=development

# Database Config
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ecommerce
DATABASE_USER=postgres
DATABASE_PASSWORD=password

MIKRO_ORM_CLI_USE_TS_NODE=true
MIKRO_ORM_CLI_TS_CONFIG_PATH=./tsconfig.orm.json
```

2. Add the following environment variables to a `.env.docker` file in the project root:

```
# Local Docker Config
POSTGRES_DB=ecommerce
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# Database Config
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=ecommerce
DATABASE_USER=postgres
DATABASE_PASSWORD=password

MIKRO_ORM_CLI_USE_TS_NODE=true
MIKRO_ORM_CLI_TS_CONFIG_PATH=./tsconfig.orm.json

```

3. Run the following command:

`pnpm startup`

> Ensure ports 3000 and 5432 are available.

4. Access the site at http://localhost:3000

## Cleanup

Spin down docker containers with the following command:

`pnpm docker:down`

To access the site again, just run `pnpm startup`.
