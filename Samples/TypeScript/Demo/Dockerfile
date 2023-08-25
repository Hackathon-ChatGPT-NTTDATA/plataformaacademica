FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json /app/
COPY ./node_modules/webpack/bin/webpack.js  /app/node_modules/webpack/bin/
 
RUN npm i
RUN npm install -g webpack
ADD . /app
COPY  ./ /app/

EXPOSE 5000

CMD ["npm", "webpack-dev-server", "--mode=development", "--host=0.0.0.0", "--port=5000"]