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




