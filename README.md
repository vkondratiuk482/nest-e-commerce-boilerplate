<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# E-commerce Nest

The idea of this project was to build fully functional Ecommerce platform

## Features

- JWT auth
- Roles, Permissions
- Orders, Products
- Stripe payment

## Installation

```bash
$ npm install
```

## Example of .env file
```bash
DB_NAME=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASS=pass123
JWT_ACCESS_SECRET=ACCESS_SECRET
JWT_REFRESH_SECRET=REFRESH_SECRET
STRIPE_API_KEY=STRIPE_KEY
PAYMENT_SUCCESS_URL=http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}
PAYMENT_CANCEL_URL=http://localhost:3000/cancel
```

## Running the app

```bash
# start docker containers
$ docker-compose up

# migrations for default data
$ npx typeorm migration:run

# development
$ npm run start

# watch mode
$ npm run start:dev
```

