<p align="center">
  <img src="https://i.imgur.com/X4dHh5o.png" width="500" alt="codevolution back-end logo" /></a>
</p>

  <p align="center">Back-end service for the INT20H-2023 Test</p>
    <p align="center">

## Description

API, that handles web-service requests to store, get, update and delete recipes, ingredients, user products etc.

## Installation

Install globally:
```bash
$ npm install --global yarn
```
Clone the repository and execute:
```bash
$ yarn install
```
Install Postgres Server 15 (or higher), update the .env DATABASE_URL variable with own credentials and execute:
```bash
$ npx prisma generate
$ npx prisma db push 
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Documentation

The documentation of Codevolution API is <a href="https://github.com/Codevolution-INT20H-2023/codevolution-api/wiki" target="blank">here</a>.

## Stay in touch

- Author - [Sviatoslav Shesterov](https://github.com/just-hoshinon)
- Deployed using <a href="https://dashboard.heroku.com/apps" target="blank">Heroku</a>.

## License

Back-end service is [MIT licensed](LICENSE).
