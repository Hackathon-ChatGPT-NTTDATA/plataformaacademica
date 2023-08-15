FROM node:lts-bullseye as build
WORKDIR /app
COPY package".json -/
RUN npm ci
COPY . ./
RUN npm run build

### Stage 2

FROM nginx:alpine
ADD ./config/default.conf /etc//nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/
EXPOSE 4200
CMD ["nginx","-g","daemon off;"]