/**
 * Created by Moudicat on 2017/7/26.
 */
class Particle {
  constructor(canvas) {
    this.id = Date.now();
    this.removeParticle = false;
    this.canvas = canvas;
    this.setParticle();
  }

  setParticle() {
    this.position = {
      x: (Math.random() * (this.canvas.width - 40)),
      y: -10 - (Math.random() * 50),
      z: (Math.random() * 10)
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.alpha = 1;
    this.length = 10;
    this.lineWidth = (1 - ((this.position.z / 12)));
    this.acceleration = {
      x: 0,
      y: 0.8 - (this.position.z / 10)
    };
  }
}

class Rain {
  constructor(isHeavyRain) {
    this.maxParticles = isHeavyRain ? 500 : 120;
    this.numParticles = 0;
    this.particles = [];
    this.collisionDamper = 0.1;
    this.canvas = document.getElementById('weather');
    this.ctx = this.canvas.getContext('2d');
  }

  init() {
    this.canvas.width = 1920;
    this.canvas.height = 400;
    this.loop();
    this.startRain();
  }

  newParticle() {
    this.particles.push(new Particle(this.canvas));
  }

  drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      let position = this.particles[i].position;
      this.ctx.strokeStyle = 'rgba(255,255,255,' + this.particles[i].alpha + ')';
      this.ctx.lineWidth = this.particles[i].lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(position.x, position.y);
      this.ctx.lineTo(position.x, position.y + this.particles[i].length);
      this.ctx.stroke();
    }
  }

  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].velocity.x += this.particles[i].acceleration.x;
      this.particles[i].velocity.y += this.particles[i].acceleration.y;

      this.particles[i].position.x += this.particles[i].velocity.x;
      this.particles[i].position.y += this.particles[i].velocity.y;

      this.checkFloorCollision(i, this.particles[i].position.y);

      if (this.particles[i]) {
        let nextVy = this.particles[i].velocity.y + this.particles[i].acceleration.y; // eslint-disable-line
        let nextPy = this.particles[i].position.y + this.particles[i].velocity.y;
        this.checkFloorCollision(i, nextPy);
      }

      if (this.particles[i]) {
        this.particles[i].length = this.particles[i].velocity.y * 1.8;

        if (this.particles[i].length <= -20) {
          this.particles[i].setParticle();
        }
      }

      if (this.particles[i] && this.particles[i].removed) {
        this.particles.splice(i, 1);
      }
    }
  }

  checkFloorCollision(i, nextPy) {
    if (nextPy >= this.canvas.height - (this.particles[i].position.z * (this.canvas.height / 15))) {
      this.particles[i].velocity.y *= -1;
      this.particles[i].velocity.y *= this.collisionDamper;
      this.particles[i].length = 3;
      if (this.particles[i].velocity.y >= -0.2 && this.particles[i].velocity.y <= 0.2) {
        this.particles[i].setParticle();
      }
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let filteredParticles = this.particles.filter(p => !p.removeParticle);
    if (filteredParticles.length < this.numParticles) {
      this.newParticle();
    } else if (filteredParticles.length > this.numParticles) {
      this.removeParticle();
    }
    this.updateParticles();

    this.drawParticles();
    window.cavasRAF = requestAnimationFrame(this.loop.bind(this));
  }

  removeParticle() {
    let filteredParticles = this.particles.filter(p => this.removeParticle);
    if (filteredParticles[filteredParticles.length - 1]) {
      filteredParticles[filteredParticles.length - 1].removeParticle = true;
    }
  }

  startRain() {
    let setInt = setInterval(() => {
      if (this.numParticles < this.maxParticles) {
        this.numParticles++;
      } else {
        clearInterval(setInt);
      }
    }, 20);
  }

  stopRain() {
    let setInt = setInterval(() => {
      if (this.numParticles > 10) {
        this.numParticles--;
      } else {
        clearInterval(setInt);
      }
    }, 50);
  }
}

export default Rain;
