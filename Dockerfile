FROM node:16.16.0-alpine3.16

WORKDIR /app

RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
RUN chmod +x cloud_sql_proxy

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "./cloud_sql_proxy -instances=$CLOUD_SQL_CONNECTION_NAME=tcp:0.0.0.0:3306 & cd app & npm run build & npm run start:prod"]
