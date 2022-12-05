FROM node:16.3.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g http-server

COPY . .
COPY ./src/environments/environment.prod.ts ./src/environments/environment.ts
RUN npm run build --prod --aot --outputHashing=all


FROM nginx:1.21.4-alpine
COPY --from=node /usr/src/app/dist/ui /usr/share/nginx/html
COPY ../../projekte/brainfree/docker/nginx.conf /etc/nginx/conf.d/default.conf
