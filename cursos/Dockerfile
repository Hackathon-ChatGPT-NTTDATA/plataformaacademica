FROM node:18-alpine as build
RUN npm install -g @angular/cli@15.2.9
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --chown=node:node . ./
RUN npm ci
RUN npm run build

### Stage 2
FROM nginx:1.25-alpine
COPY --from=build /app/dist/cursos /var/www/cursos
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

#### ejecutar comandos de manera local

###  docker build . -t cursos:1.0
###  docker build . -t cursos:1.0

###  docker run  -p 80:80  cursos:1.0

## la configuracion de nginx esta en la carpeta config al puerto 80


