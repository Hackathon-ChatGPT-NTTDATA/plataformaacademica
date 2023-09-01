FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY  ./ /app/
CMD ["npm run-script serve","npm run-script start","npm start"]




### Stage 2

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
RUN echo $(ls -1 /etc/nginx/conf.d/)

COPY --from=build /app/dist /var/www/app/
COPY --from=build /app/Framework/src /var/www/app/
COPY --from=build /app/src /var/www/app/
RUN echo $(ls -1 /var/www/app/)

COPY --from=build /app/Framework/src /usr/share/nginx/html/
COPY --from=build /app/src /usr/share/nginx/html

RUN echo $(ls -1 /usr/share/nginx/html/)
EXPOSE 80
CMD ["nginx","-g","daemon off;"]


FROM node:lts-bullseye as buildx
WORKDIR /app
COPY ./package.json /app/
COPY ./node_modules/webpack-cli/bin/cli.js  /app/node_modules/.bin/webpack-cli/
COPY ./Framework/src/model  /app/src/model/
COPY ./Framework/ /app/src/model/
COPY ./Framework/ /app/
COPY ./Core /app/src/
COPY ./Core /app/
COPY . ./app/
RUN npm i
RUN npm install -g webpack
RUN npm install -g webpack-dev-server


EXPOSE 5000

CMD ["npm", "start"]

#### ejecutar comandos de manera local

###  docker build . -t avatar:latest   

###  docker run --rm -it --entrypoint bash -p 5000:5000  avatar:latest

### root@5acc935abcab:/# webpack --mode development

### root@5acc935abcab:/# npm run-script serve

### PS D:\hackathon\frontend\xingularidad\plataformaacademica\cursos> docker run -d -p 80:80 cursos:latest
