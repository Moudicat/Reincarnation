FROM node:lts-alpine

COPY package*.json /app/

WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm install -g pm2 --registry=https://registry.npm.taobao.org

COPY . /app

EXPOSE 6666

CMD npm start