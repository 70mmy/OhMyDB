
## About OhMyDB

The local system requires `npm@9.8`, `composer@2.5` and `docker@24.0` with `docker-compose@2.20` to run.
Note: The above versions are the versions I worked with, it whould work with other versions as well.


```
git clone git@github.com:70mmy/OhMyDB.git

cd OhMyDB/fe-service
npm install

cd ../meta-service
npm install

cd ../movie-service
cp .env.example .env
composer install

./vendor/bin/sail up -d

./vendor/bin/sail artisan migrate
```

At this point a front end should be available here: `http://localhost:3000`
A GraphQL sandbox should be available here: `http://localhost:4000/graphql`
