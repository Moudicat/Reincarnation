FROM node:latest

ENV NAME reincarnation-server

WORKDIR /app
ADD ./server /app

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]
#CMD ["pm2", "start", "pm2.json", "--env production", "--no-deamon"]  "NODE_ENV=production"