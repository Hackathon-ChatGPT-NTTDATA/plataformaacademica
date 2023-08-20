FROM node:lts-bullseye as build
WORKDIR /app
COPY  ./ /app/
COPY  package*.json ./
COPY ./Framework ./Framework
RUN npm install
CMD ["npm run-script serve","npm run-script start","npm start"]




### Stage 2

FROM nginx:alpine
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
