FROM node:lts-bullseye as build
WORKDIR /app
COPY  package*.json ./
RUN npm ci
COPY ./Framework ./
CMD ["sudo chmod -R +x node_modules","npm run-script serve"]
RUN npm run-script serve



### Stage 2

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]