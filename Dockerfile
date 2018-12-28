# ---- Base Node ----
FROM node:8.14.0-alpine AS base
WORKDIR /usr/src/app
COPY package.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN yarn install --production
RUN cp -R node_modules ../prod_node_modules
RUN yarn install

# ---- Test ----
FROM dependencies AS test
COPY . .
RUN yarn test

# ---- Build ----
FROM test AS build
RUN yarn build

# ---- Release ----
FROM gcr.io/distroless/nodejs
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/package.json ./package.json
COPY --from=dependencies /usr/src/prod_node_modules  ./node_modules
COPY --from=build /usr/src/app/dist ./dist
CMD ["dist/server.js"]