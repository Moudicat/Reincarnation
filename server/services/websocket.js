/**
 * Created by Moudicat on 2017/11/26.
 */
import WebSocket from 'ws';

function InfoMsg(type, data) {
  this.type = `info_${type}`;
  this.data = data;
}

export default class WebSocketServer {
  constructor() {
    this.online = 0;
    this.wss = new WebSocket.Server({port: 2778});
    this.init();
    this.schedule();
  }

  init() {
    this.wss.on('connection', (ws) => {
      ws.on('message', (msg) => {
        console.log(`[recv] message: ${msg}`);
      });

      this.online++;
      setTimeout(() => this.sendOnlineEvent());

      ws.on('close', () => {
        this.online--;
        this.sendOnlineEvent();
      });
    });
  }

  schedule() {
    // 1分钟任务
    setInterval(() => {
      this.sendWeatherEvent();
    }, 1000 * 60);
  }

  broadcast(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }

    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  }

  sendOnlineEvent(online) {
    this.broadcast(new InfoMsg('online', {online: this.online}));
  }

  sendWeatherEvent() {
    global.weather.timestamp = new Date() - 1495199400000;
    this.broadcast(new InfoMsg('weather', global.weather));
  }

  
}