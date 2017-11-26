/**
 * Created by Moudicat on 2017/11/26.
 */
import WebSocket from 'ws';

export default class WebSocketServer {
  constructor() {
    this.online = 0;
    this.wss = new WebSocket.Server({port: 2778});
    this.init();
  }

  init() {
    this.wss.on('connection', (ws) => {
      ws.on('message', (msg) => {
        console.log(`[recv] message: ${msg}`);
      });

      this.online++;
      setTimeout(() => {
        this.broadcast({online: this.online});
      });

      ws.on('close', () => {
        this.online--;
        this.broadcast({online: this.online});
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
}