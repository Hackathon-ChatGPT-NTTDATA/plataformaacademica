FROM node:lts-bullseye as build
COPY . .

RUN npm install -g webpack
RUN npm install -g webpack-dev-server


EXPOSE 5000
ENTRYPOINT [ "/","webpack --mode development" ]
CMD ["npm run-script serve"]

