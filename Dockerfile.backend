FROM node:22.11.0-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY backend/package.json  .
COPY .env .


RUN npm install
COPY backend/ .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]