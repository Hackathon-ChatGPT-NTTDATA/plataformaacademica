FROM node:lts-bullseye as build
WORKDIR /app
COPY  ./ /app/
RUN npm install
RUN npm run build --prod
CMD ["sudo chmod -R +x node_modules","npm run-script serve"]

### Stage 2

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/cursos /var/www/app/
COPY --from=build /app/dist/cursos /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

#### ejecutar comandos de manera local

###  docker build . -t cursos:latest


###  docker run  -p 80:80  cursos:latest

## la configuracion de nginx esta en la carpeta config al puerto 80
