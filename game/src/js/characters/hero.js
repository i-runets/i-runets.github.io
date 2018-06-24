import {heal, bullet, sound} from '../assets';

export default class Hero {
  constructor(options) {
    this.frameIndexIdle = 1;
    this.frameIndexAttack = 10;
    this.tickCountIdle = 0;
    this.tickCountAttack = 0;
    this.ticksPerFrame = options.ticksPerFrame || 4;
    this.numberOfFrames = options.numberOfFrames;
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = new Image();
    this.image.src = options.imageSrc;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.x = options.x;
    this.y = options.y;
    this.hp = options.hp;
    this.name = options.name;
    this.state = 'idle';
  }

  renderName() {
    this.context.fillStyle = '#382B5F';
    this.context.fillText(this.name, this.x + 130, this.y - 60);
  }

  renderHP() {
    this.context.fillStyle = 'red';
    this.context.fillText(`${this.hp} HP`, this.x + 130, this.y - 20);
  }

  render() {
    this.update();
    this.renderName();
    this.renderHP();
    this.context.drawImage(this.image, this.frameIndexIdle * this.frameWidth, 0,
        this.frameWidth, this.frameHeight, this.x, this.y, this.width,
        this.height);
    if (this.state === 'attacking') {
      this.context.drawImage(this.image, this.frameIndexAttack *
          this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x, this.y,
          this.width, this.height);
      this.context.drawImage(bullet, 830, 400, 50, 50);
    }
    if (this.state === 'healing') {
      this.context.drawImage(heal, 100, 400, 250, 200);
    }
  }

  update() {
    if (this.state === 'idle' || this.state === 'healing') {
      this.tickCountIdle += 1;
      if (this.tickCountIdle > this.ticksPerFrame) {
        this.tickCountIdle = 0;
        if (this.frameIndexIdle < this.numberOfFrames - 4) {
          this.frameIndexIdle += 1;
        } else {
          this.frameIndexIdle = 1;
        }
      }
    }
    if (this.state === 'attacking') {
      this.tickCountAttack += 1;
      if (this.tickCountAttack > this.ticksPerFrame) {
        this.tickCountAttack = 0;
        if (this.frameIndexAttack < this.numberOfFrames) {
          this.frameIndexAttack += 1;
        } else {
          this.frameIndexAttack = 10;
        }
      }
    }
  }

  attack(target) {
    this.state = 'attacking';
    target.hp -= Math.floor(Math.random() * 15 + 10);
    sound.gunSound.play();
    setTimeout(() => {
      this.state = 'idle';
    }, 400);
  }

  heal() {
    this.state = 'healing';
    this.hp += Math.floor(Math.random() * 15 + 10);
    sound.healSound.play();
    setTimeout(() => {
      this.state = 'idle';
    }, 400);
  }
}