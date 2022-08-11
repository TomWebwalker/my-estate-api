FROM node:16.16.0-alpine3.16

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

CMD ["npm run start:prod"]