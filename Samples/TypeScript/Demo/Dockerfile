FROM node:lts-bullseye as build
WORKDIR /app
COPY  ./ /app/
COPY ./Framework ./app/Framework
RUN npm install
RUN NODE_ENV=development npm i
CMD ["npm run-script serve","npm run-script start","npm start"]




### Stage 2

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/Framework/src /var/www/app/
COPY --from=build /app/src /var/www/app/
COPY --from=build /app/Framework/src /usr/share/nginx/html
COPY --from=build /app/src /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
