FROM node:22.11.0-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json  .

RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]