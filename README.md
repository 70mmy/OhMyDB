
## About OhMyDB

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
