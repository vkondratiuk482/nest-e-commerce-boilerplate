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

## Installation

```bash
$ npm install
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

