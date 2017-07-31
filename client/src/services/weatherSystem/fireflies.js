/**
 * Created by Moudicat on 2017/7/31.
 */
'use strict';
export default class Fireflies {
  constructor() {
    this.canvas = document.getElementById('weather');
    this.ctx = this.canvas.getContext('2d');
    this.bg = document.getElementsByClassName('background-wrapper')[0];
    this.MAX_FLIES = 25;
    this.flies = [];
    this.w = 1920;
    this.h = 400;
  }

  init() {
    this.w = parseInt(getComputedStyle(this.bg).width);
    this.canvas.setAttribute('width', this.w);
    this.canvas.setAttribute('height', this.h);

    this.loop();

    window.onresize = () => {
      this.w = parseInt(getComputedStyle(this.bg).width);
      this.canvas.setAttribute('width', this.w);
    };
  }

  render() {
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.w, this.h);
    if (this.flies.length !== this.MAX_FLIES) {
      this.flies.push(new Fly());
    }
    this.flies.forEach((fly) => {
      fly.x += fly.xSpeed;
      fly.y += fly.ySpeed;
      fly.age++;

      if (fly.age < fly.lifeSpan / 2) {
        fly.colors.alpha += 1 / (fly.lifeSpan / 2);

        if (fly.colors.alpha > 1) {
          fly.colors.alpha = 1;
        }
      } else {
        fly.colors.alpha -= 1 / (fly.lifeSpan / 2);

        if (fly.colors.alpha < 0) {
          fly.colors.alpha = 0;
        }
      }
    });

    let i = this.flies.length;

    while (i--) {
      let fly = this.flies[i];

      if (fly.age >= fly.lifeSpan) {
        this.flies.splice(i, 1);
      }
    }
    this.flies.forEach((fly) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
      this.ctx.arc(
        fly.x,
        fly.y,
        fly.size,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.fill();
    });
  }

  loop() {
    this.render();
    window.canvasRAF = requestAnimationFrame(this.loop.bind(this));
  }
}

class Fly {
  constructor(options) {
    if (!options) {
      options = {};
    }
    this.FLY_XSPEED_RANGE = [-1, 1];
    this.FLY_YSPEED_RANGE = [-0.5, 0.5];
    this.FLY_SIZE_RANGE = [1, 5];
    this.FLY_LIFESPAN_RANGE = [75, 150];
    this.w = 1920;
    this.h = 400;

    this.x = options.x || this.randomRange(0, this.w);
    this.y = options.y || this.randomRange(0, this.h);
    this.xSpeed = options.xSpeed || this.randomRange(this.FLY_XSPEED_RANGE[0], this.FLY_XSPEED_RANGE[1]);
    this.ySpeed = options.ySpeed || this.randomRange(this.FLY_YSPEED_RANGE[0], this.FLY_YSPEED_RANGE[1]);
    this.size = options.size || this.randomRange(this.FLY_SIZE_RANGE[0], this.FLY_SIZE_RANGE[1]);
    this.lifeSpan = options.lifeSpan || this.randomRange(this.FLY_LIFESPAN_RANGE[0], this.FLY_LIFESPAN_RANGE[1]);
    this.age = 0;

    this.colors = options.colors || {
      red: 207,
      green: 255,
      blue: 4,
      alpha: 0
    };
  }

  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}
