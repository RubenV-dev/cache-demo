**_CACHE DEMO_**

This is a quick example of what server-side caching could look like with redis. Caching is used to reduce latency by speeding up responses for repeated requests, decrease database load, and improve scalability.

**_Steps to get this project running_**

Install dependendies using:

```bash
npm install
```

Setup your .env file:

```env
PORT=3000
DATABASE_URL = postgresql://user:password@localhost:5432/dbname
REDIS_URL = redis://localhost:6379
```

Setup a Redis and Postgres instance using Docker then run your app:

```bash
docker run -d --name redis -p 6379:6379 redis
docker run -d --name postgres -e POSTGRES_PASSWORD=mypass -p 5432:5432 postgres
node index.js
```

Make sure the password you use in this command is the password you set in your .env file. The default user will be postgres and the dbname would also be postgres by default.

So your DATABASE_URL string in this example would be:

```
DATABASE_URL = postgresql://postgres:mypass@localhost:5432/postgres
```

You can test using curl

```bash
curl http://localhost:3000/user/1
```

The first call would yield a cache miss and respond from DB
The second call would be a cache hit and respond from redis

Troubleshooting commands you may find useful:

```js
//check running docker processess
docker ps
//go into docker container to run
docker exec -it postgres psql -U postgres
//inside docker container to list users
\du
//to enter bash of container
docker exec =it postgres bash
//to reset your docker container
docker stop some-postgres
docker rm some-postgres
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=mypass \
  -p 5432:5432 \
  postgres

```

On a windows machine you may find that the localhost env does not match what docker is using specifically if you are running a docker desktop setup. For this case you may want to consider changing your database_url string to use host.docker.internal instead of localhost.
