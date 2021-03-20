# Description
This is simple project for user authentication and goods management

# Docker deployment
If you want to up project on the docker you need to run next

```
docker-compose up
```

## How to run
Firstly, you need create .env in the root of the project
and copy all parameters from .env.example to .env file.  

Then create your mysql database and specify database connection in DATABASE CONNECTION block
of the env file

Then you need to run

```
npm install
```

After than, you need to database migrations

```
npx typeorm migration:run
```

If you've got some errors then install typeorm globally

```
npm install typeorm -g
```

If your settings are correct, then run

```
npm run start:prod

or run for debug

npm run start:dev
```