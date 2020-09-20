[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Poke API

This application works as a API for Pokemon services.

## Quick Start

Get started developing...

```shell
# install deps
yarn install

# run in development mode
yarn dev

# run tests
yarn test
```

---

## Environment Variables

```shell
# Application name
APP_ID

# Port the application will listen to
PORT

# Level that an application will logger
LOG_LEVEL

# Limit json size
REQUEST_LIMIT

# Path to static file api.yml
OPENAPI_SPEC

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
yarn install
```
### Optional Yarn Offline Mirror
Just copy .yarnrc.example to new file .yarnrc

```shell
cp .yarnrc.example .yarnrc
```

## Configuring Formating / Linting for your IDE

This project uses [Prettier](https://prettier.io/) for formating and [ESLint](https://eslint.org/) for linting.

We highly recommend the usage of [VSCode](https://code.visualstudio.com) as your default code tool.


To configure Prettier at VSCode just install it directly from extensions or run in your command palette:

```shell
ext install esbenp.prettier-vscode
```

Search for your chosen IDE bellow for configuring linting correctly.

#### VSCode

Just install extension ESLint and you are done.

The auto-fix/format-on-save feature is already configured at .vscode/settings.json

```shell
ext install dbaeumer.vscode-eslint
```

#### Other Editors

If your editor is not represented above, there may be an integration already or a way to use the eslint command directly to achieve a similar effect.

## Run It

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
yarn dev
```

or debug it

```shell
yarn dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
yarn compile
yarn start
```

#### Run inside Docker:

Run the application inside a docker container

```shell
docker-compose up -d
```

## Test It

Run the Mocha unit tests

```shell
yarn test
```

or debug them

```shell
yarn test:debug
```

## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file
