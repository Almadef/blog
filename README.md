## Blog on NestJS
### Project stack
* nodejs 14
* postgres 13
* minio RELEASE.2021-01-05T05-22-38Z

### The plan of deployment of dev environment
1. In ./ create .env;
2. In ./docker/postgres create .env;
3. In ./docker/pgadmin create .env;
4. At the root of the code base, run the command `docker-compose up -d`;
5. Look [app graphql](http://localhost:3000/graphql), [app swagger](http://localhost:3000/api), [pgadmin](http://localhost:5050/), [minio](http://localhost:9000/).

### Logs
* Postgres logs can be viewed in ./docker/postgres/logs

### Migration commands
* Generate migration files from database `docker-compose exec nodejs yarn run migration:generate`
* Create migration file `docker-compose exec nodejs yarn run migration:create <name>`
* Up migrations `docker-compose exec nodejs yarn run migration:run`
* Revert migrations `docker-compose exec nodejs yarn run migration:revert`

### Other commands
* Run eslinter `docker-compose exec nodejs yarn run lint`