FROM node:lts-bullseye as build
WORKDIR /app
COPY ./package.json /app/
COPY ./node_modules/webpack/bin/webpack.js  /app/node_modules/webpack/bin/
COPY ./node_modules/webpack-cli/bin/cli.js  /app/node_modules/webpack-cli/bin/
COPY ./node_modules/webpack-cli/bin/cli.js  /app/node_modules/.bin/webpack-cli/
COPY ./Framework/src/model  /app/src/model/
COPY ./Core /app/src/
COPY . ./app/
RUN npm i
RUN npm install -g webpack
ADD . /app
COPY  ./ /app/

EXPOSE 5000

CMD ["npm", "start"]
