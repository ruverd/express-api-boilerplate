# express-api-boilerplate
# RESTful API using Node.js, Express, Mongoose & TypeScript

This is a boilerplate for building scalable and robust REST APIs using Node.js & TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Directory Structure](#directory-structure)
  - [Available Routes](#available-routes)
  - [Available Scripts](#available-scripts)
- [License](#license)

## Prerequisites

You need to install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) either on your local machine or using a cloud service.

## Features

- [TypeScript](https://www.typescriptlang.org/) as Language

- Framework: [Express.js](https://expressjs.com/)

- ODM: [Mongoose](https://mongoosejs.com/)

- Linting and formatting code using [TSLint](https://palantir.github.io/tslint/) & [Prettier](https://prettier.io/)

- Authentication & Authorization with [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken#readme)

- Easy configuration of environment variables thanks to [dotenv](https://github.com/motdotla/dotenv)

- Logger: [Winston] (https://github.com/winstonjs/winston#readme)

- Validation: [Joi] (https://github.com/hapijs/joi)

- Crypto: [bcrypt] (https://github.com/kelektiv/node.bcrypt.js#readme) 

- Cross-origin resource sharing: [cors] (https://github.com/expressjs/cors#readme)

- Util library to easy work with number, arrays, string and more... [Loadash] (https://lodash.com/)

- Parsing, validating, manipulating, and formatting dates [moment] (https://momentjs.com/)

- Monitor changes in your source and automatically restart your server [Nodemon] (https://nodemon.io/) 

- Using the last ES6 / ES7 features as `async-await`

- Versioned routes for better scalability

- [Jest] need implamentation

- [supertest] need implamentation

## Getting Started

### Installation

1. install the dependencies using `npm i`

2. Rename the file `.env.example` to `.env`, then you need to configure the file `config.ts` located in `src/config`

3. Start the app using `npm run dev`

4. After that, go to: `http://localhost:3000/api/users` or `http://localhost:3000/api/users`

### Directory Structure

```
|── logs
|   ├── logFile.log 
|   └── uncaughtExceptions.log
├── src
|   ├── middleware
│   │   └── auth.ts
│   ├── v1
│   │   ├── auth
│   │   │  ├── controller.ts
│   │   │  ├── validate.ts
│   │   │  └── route.ts
│   │   ├── user
│   │   │   ├── controller.ts
│   │   │   ├── model.ts
│   │   │   ├── validate.ts
│   │   │   └── route.ts
│   │   └── index.ts
│   ├── config
│   │   ├── config.ts
│   │   └── db.ts
│   ├── utils
│   │   ├── errorHandler.ts
│   │   ├── HttpException.ts
│   │   └── verifyToken.ts
│   ├── routes.ts
│   ├── seed.ts
│   ├── App.ts
│   └── index.ts
├── tests
├── .gitignore
├── .env.example
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json
```

### Available routes

| Method   | Resource        | Description                                                                                                                                 |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`   | `/register`     | Create a new user in the DB. You need to specify in the body the following attributes: name, email & password.                    |
| `POST`   | `/authenticate` | Sign in with the email & password. If it's successful, then generates a token                                                               |
| `GET`    | `/users`        | Returns the collection of users present in the DB.                                                                                          |
| `GET`    | `/users/:id`    | It returns the specified id user. You need to specify the token in the header with the following format: `Authorization: Bearer your-token` |
| `PUT`    | `/users/:id`    | Updates an already created user in the DB                                                                                                   |
| `DELETE` | `/users/:id`    | Deletes a user from the DB                                                                                                                  |

### Available scripts

- `build` - Transpile TypeScript to ES6,
- `lint` - Lint your TS code,
- `dev` - To run the app without transpile to ES6,
- `clean` - Remove dist, node_modules, coverage folders,
- `start` - Run the transpiled app
- `prod` - Build & run the transpiled app
- `seed` - Build & run the transpiled app, run seed file and remove dist folder
- `test` - Run tests

## License

MIT © Ruver Dornelas
