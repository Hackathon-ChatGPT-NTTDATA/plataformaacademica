FROM node:lts-bullseye as build
COPY . .

RUN npm install -g webpack
RUN npm install -g webpack-dev-server


EXPOSE 5000
ENTRYPOINT [ "/","webpack --mode development" ]
CMD ["npm run-script serve"]

#### ejecutar comandos de manera local

###  docker build . -t avatar:latest   

###  docker run --rm -it --entrypoint bash -p 5000:5000  avatar:latest

### root@5acc935abcab:/# webpack --mode development

### root@5acc935abcab:/# npm run-script serve

### PS D:\hackathon\frontend\xingularidad\plataformaacademica\cursos> docker run -d -p 80:80 cursos:latest