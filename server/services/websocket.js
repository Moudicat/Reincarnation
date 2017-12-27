/**
 * Created by Moudicat on 2017/11/26.
 */
import WebSocket from 'ws';
import { Room } from 'bililive-sub';
import config from '../config';

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

    this.bililiveInfo = [];
    this.initBililive();
  }

  init() {
    this.wss.on('connection', (ws) => {
      ws.on('message', (msg) => {
        // console.log(`[recv] message: ${msg}`);
      });

      this.online++;
      setTimeout(() => {
        this.sendOnlineEvent();
        ws.send(JSON.stringify(new InfoMsg('historybililive', this.bililiveInfo)));
      }, 1000);

      ws.on('close', () => {
        this.online--;
        this.sendOnlineEvent();
      });

      // net.Socket errors are no longer swallowed in current version.
      ws.on('error', () => {});
    });
  }

  schedule() {
    // 3分钟任务
    setInterval(() => {
      this.sendWeatherEvent();
    }, 1000 * 60 * 3);
  }

  initBililive() {
    config.bililive.roomids.forEach((roomid, index) => {
      let room = new Room(roomid);
      room.on('info', info => {
        this.bililiveInfo[index] = info;
        info.roomid = roomid;
        this.sendBililiveEvent(info);
      });
    });
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

  sendBililiveEvent(info) {
    this.broadcast(new InfoMsg('bililive', info));
  }
}