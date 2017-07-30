/**
 * Created by Moudicat on 2017/7/26.
 */

class Snow {
  constructor() {
    this.canvas = document.getElementById('weather');
    this.ctx = this.canvas.getContext('2d');
    this.bg = document.getElementsByClassName('background-wrapper')[0];
    this.w = 1920;
    this.h = 400;
    this.rate = 30;
    this.number = 500;
    this.count = 0;
    this.size = 2;
    this.speed = 15;
    this.snowflakes = [];
    this.colors = ['#eee', '#c5d3e6', '#dcd8ff'];
    this.time = 0;
    this.timer = null;
  }

  init() {
    this.w = parseInt(getComputedStyle(this.bg).width);
    this.canvas.setAttribute('width', this.w);
    this.canvas.setAttribute('height', this.h);
    this.makeSnow();
    this.move();

    window.onresize = () => {
      this.snowflakes = [];
      this.w = parseInt(getComputedStyle(this.bg).width);
      this.canvas.setAttribute('width', this.w);
      this.makeSnow();
    };
  }

  makeSnow() {
    for (let i = 0; i < this.number; i++) {
      this.snowflakes[i] = {
        x: Math.ceil(Math.random() * this.w),
        y: Math.ceil(Math.random() * this.h),
        dX: Math.random() * 5 + 1,
        dY: Math.random() * 5 + 1,
        c: this.colors[Math.floor(Math.random() * this.colors.length)],
        size: Math.random() * this.size
      };
    }
  }

  move() {
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.snowflakes.forEach(e => {
      this.ctx.beginPath();
      this.ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2, false);
      this.ctx.fillStyle = e.c;
      this.ctx.fill();

      e.x = e.x + e.dX * (this.time * 0.05);
      e.y = e.y + e.dY * (this.time * 0.05);

      if (e.x > this.w) {
        e.x = 0;
      }
      if (e.y > this.h) {
        e.y = 0;
      }
      if (e.x < 0) {
        e.x = this.w;
      }
      if (e.y < 0) {
        e.y = this.h;
      }
    });

    if (this.time < this.speed) {
      this.time++;
    }
    window.cavasRAF = setTimeout(this.move.bind(this), 1000 / this.rate);
  }
}

export default Snow;
