FROM node:16-alpine

RUN mkdir -p /client/src/www && \
  apt-get -y update && \
  npm install -g http-server

COPY . /client/src/vue
WORKDIR /client/src/vue
RUN npm install
RUN npm run build
RUN cp -r /client/src/vue/dist/* /client/src/www

WORKDIR /client/src/www
EXPOSE 8080
CMD http-server -p 8080 --log-ip