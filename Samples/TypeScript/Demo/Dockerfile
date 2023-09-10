FROM node:18-alpine as build
## EXPOSE 5000  
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY package*.json ./
RUN npm install -g webpack
RUN npm install -g webpack-dev-server
COPY --chown=node:node . ./
RUN npm ci
RUN npm run build
## CMD ["npm","start"]
## RUN npm install --save @types/ws@8.5.4

### Stage 2
FROM nginx:1.25-alpine
COPY --from=build /app/Core /var/www/avatar/Core
COPY --from=build /app/Resources /var/www/avatar/Resources
COPY --from=build /app/Framework/src /var/www/avatar/Framework/src
COPY --from=build /app/dist /var/www/avatar/dist
COPY --from=build /app/index.html /var/www/avatar/index.html
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 5000

#### ejecutar comandos de manera local

###  docker build . -t avatar:latest   

###  docker run --rm -it --entrypoint bash -p 5000:5000  avatar:latest

### root@5acc935abcab:/# webpack --mode development

### root@5acc935abcab:/# npm run-script serve

### docker build . -t avatar:1.0
### docker run -d --name avatar-app-local -p 80:80 avatar:1.0

### PS D:\hackathon\frontend\xingularidad\plataformaacademica\cursos> docker run -d -p 80:80 cursos:latest