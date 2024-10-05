FROM node:22.9.0-alpine3.20 AS base
RUN npm i -g yarn --force

# development stage
FROM base AS development
WORKDIR /app
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c" , "yarn install -D && yarn dev"]

# build stage
FROM base AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.27.1-alpine3.20 AS production

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /opt/app

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
