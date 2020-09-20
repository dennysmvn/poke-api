# Initial build using the `yarn install and compile` commands
FROM node:12-alpine as build
WORKDIR /

# Copy required files
COPY ./server ./server
COPY ./config ./config
COPY [ "package.json", "yarn.lock", "tsconfig.json", "build.ts", ".env", "./" ]

RUN yarn install && yarn compile

# Fetch production-only dependencies
FROM node:12-alpine as dependencies
ENV NODE_ENV='production'

WORKDIR /

COPY --from=build [ "/package.json", "/yarn.lock", "./" ]
RUN yarn install --production=true

# Build done, create the deployable/runnable image step
FROM node:12-alpine as release
ENV NODE_ENV='production'

RUN mkdir -p /opt/app
WORKDIR /opt/app

# Copy dependencies and compiled application from previous steps
COPY --from=dependencies /node_modules /opt/app/node_modules
COPY --from=build /dist /opt/app/dist
COPY --from=build .env /opt/app/.env

WORKDIR /opt/app

# Run the application using node
ENTRYPOINT ["node", "dist/index.js"]