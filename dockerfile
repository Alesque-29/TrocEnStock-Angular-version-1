# étape 1
FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
 
# étape 2
FROM nginx:1.18.0-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-step /app/dist/TrocEnStock-Angular /usr/share/nginx/html