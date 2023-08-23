FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json /app/


RUN npm i

ADD . /app
COPY  ./ /app/

EXPOSE 5000

CMD ["npm run-script serve","npm run-script start","npm start"]"]