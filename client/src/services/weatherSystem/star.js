/**
 * Created by Moudicat on 2017/7/31.
 */

export default class Star {
  constructor() {
    this.canvas = document.getElementById('weather');
    this.ctx = this.canvas.getContext('2d');
    this.bg = document.getElementsByClassName('background-wrapper')[0];
    this.sizes = ['micro', 'mini', 'medium', 'big', 'max'];
    this.elements = [];
    this.max_bright = 1;
    this.min_bright = 0.2;
    this.w = 1920;
    this.h = 400;
  }

  init() {
    this.w = parseInt(getComputedStyle(this.bg).width);
    this.canvas.setAttribute('width', this.w);
    this.canvas.setAttribute('height', this.h);
    this.generate(200, 0.8);
    this.spark(30);

    window.onresize = () => {
      this.w = parseInt(getComputedStyle(this.bg).width);
      this.canvas.setAttribute('width', this.w);
    };
  }

  generate(starsCount, opacity) {
    for (let i = 0; i < starsCount; i++) {
      let x = this.randomInt(2, this.canvas.offsetWidth - 2);
      let y = this.randomInt(2, this.canvas.offsetHeight - 2);
      let size = this.sizes[this.randomInt(0, this.sizes.length - 1)];

      this.elements.push(this.star(x, y, size, opacity));
    }
  }

  spark(numberOfStarsToAnimate) {
    for (let i = 0; i < numberOfStarsToAnimate; i++) {
      let id = this.randomInt(0, this.elements.length - 1);
      let obj = this.elements[id];
      let newAlpha = obj.alpha;
      do {
        newAlpha = this.randomFloatAround(obj.alpha);
      } while (newAlpha < this.min_bright || newAlpha > this.max_bright);

      this.elements[id] = this.star(obj.x, obj.y, obj.size, newAlpha);
    }

    window.cavasRAF = requestAnimationFrame(() => {
      this.spark(numberOfStarsToAnimate);
    });
  }

  star(x, y, size, alpha) {
    let radius = 0;
    switch (size) {
      case 'micro':
        radius = 0.8;
        break;
      case 'mini':
        radius = 1.0;
        break;
      case 'medium':
        radius = 1.7;
        break;
      case 'big':
        radius = 2.2;
        break;
      case 'max':
        radius = 3.2;
        break;
    }

    let gradient = this.ctx.createRadialGradient(x, y, 0, x + radius, y + radius, radius * 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.beginPath();
    this.ctx.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    return {
      'x': x,
      'y': y,
      'size': size,
      'alpha': alpha
    };
  }

  randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  randomFloatAround(num) {
    let plusminus = this.randomInt(0, 1000) % 2;
    if (plusminus) {
      num += 0.1;
    } else {
      num -= 0.1;
    }
    return parseFloat(num.toFixed(1));
  }
}
