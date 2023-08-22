FROM node:lts-bullseye as build
WORKDIR /app
COPY  ./ /app/
RUN npm install
RUN npm run build --prod
CMD ["sudo chmod -R +x node_modules","npm run-script serve"]

### Stage 2

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/cursos /var/www/app/
COPY --from=build /app/dist/cursos /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

