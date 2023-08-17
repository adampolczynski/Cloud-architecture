## Playing with architecture

Application contains 4 'services' (and 2 DB's) split into two domains

### User domain:

- `backend` (modules: auth, user, order), port 4000, 4001,
- `frontend` (pages: auth (login, register), user (profile), order), port 3000,
- `mongoDB` (collections: user, user_action, order), port 27017

### Internal tools (system) domain:

- `backend-internal` (modules: image, image-generator, orders), port 4002,
- `frontend-admin` (pages: login, orders (to manage orders)), port 3001,
- `postgreSQL` (tables: user, image, actions), port 5432

## Run locally:

1. Create directory for postgres db volume `/data/db-postgres/`,
2. Create directory for mongo db volume `/data/db-mongo/`,
3. For each folder copy `.env.sample` and rename to `.env`, check values (if applicable),
4. Create test user in mongoDB (default credentials tester:test),
5. Run with `docker compose up -d`
6. Use credentials from `docker-compose.yml` to connect to pgadmin on `localhost:5000` if needed :)
