import {bodyParts} from './monsterBodyParts';
import {name} from './monsterName';
import {lighting, sound} from '../assets';
import {arrayRandomNumber} from '../utils/utils';

export default class Monster {
  constructor(options) {
    this.context = options.context;
    this.x = options.x;
    this.y = options.y;
    this.hp = 40;
    this.name;
    this.leftLegs;
    this.rightLegs;
    this.leftHands;
    this.rightHands;
    this.body;
    this.head;
    this.state = 'idle';
    this.breathDir = 1;
    this.breathInc = 0.08;
    this.breathAmt = 0;
    this.breathMax = 2;
    this.generateBody();
    this.generateName();
  }

  generateName() {

    const a = arrayRandomNumber(name.firstName);
    const b = arrayRandomNumber(name.middleName);
    const c = arrayRandomNumber(name.lastName);

    this.name = `${name.firstName[a]} ${name.middleName[b]} ${name.lastName[c]}`.replace(
        /(?:^|\s)\S/g, a => a.toUpperCase());
  }

  generateHealth(mk) {
    this.hp = 40 + mk * 15;
  }

  generateBody() {
    const a = Math.floor(Math.random() * bodyParts.leftLegs.length);
    const b = Math.floor(Math.random() * bodyParts.rightLegs.length);
    const c = Math.floor(Math.random() * bodyParts.leftHands.length);
    const d = Math.floor(Math.random() * bodyParts.rightHands.length);
    const e = Math.floor(Math.random() * bodyParts.body.length);
    const f = Math.floor(Math.random() * bodyParts.head.length);

    this.leftLegs = new Image();
    this.leftLegs.src = bodyParts.leftLegs[a];

    this.rightLegs = new Image();
    this.rightLegs.src = bodyParts.rightLegs[b];

    this.leftHands = new Image();
    this.leftHands.src = bodyParts.leftHands[c];

    this.rightHands = new Image();
    this.rightHands.src = bodyParts.rightHands[d];

    this.body = new Image();
    this.body.src = bodyParts.body[e];

    this.head = new Image();
    this.head.src = bodyParts.head[f];
  }

  update() {
    if (this.breathDir === 1) {      /*animation*/
      this.breathAmt -= this.breathInc;
      if (this.breathAmt < -this.breathMax) {
        this.breathDir = -1;
      }
    } else {
      this.breathAmt += this.breathInc;
      if (this.breathAmt > this.breathMax) {
        this.breathDir = 1;
      }
    }
  }

  renderName() {
    this.context.fillStyle = '#382B5F';
    this.context.fillText(this.name, this.x + 70, this.y - 60);
  }

  renderHP() {
    this.context.fillStyle = 'red';
    this.context.fillText(`${this.hp} HP`, this.x + 70, this.y - 20);
  }

  render() {
    this.update();
    this.renderName();
    this.renderHP();
    this.context.drawImage(this.body, this.x + 20, this.y + 140, 100,
        130);
    this.context.drawImage(this.head, this.x, this.y - this.breathAmt,
        150, 150);
    this.context.drawImage(this.rightHands, 0, 0, this.rightHands.width /
        2,
        this.rightHands.height,
        this.x - 40, this.y + 150 - this.breathAmt, 70, 100);
    this.context.drawImage(this.rightLegs, this.x, this.y + 250, 50, 70);
    this.context.drawImage(this.leftLegs, this.x + 90, this.y + 250, 50,
        70);

    if (this.state === 'idle') {
      this.context.drawImage(this.leftHands, 0, 0, this.leftHands.width /
          2,
          this.leftHands.height,
          this.x + 90, this.y + 150 - this.breathAmt, 70, 100);
    }
    if (this.state === 'attacking') {
      this.context.drawImage(this.leftHands, this.leftHands.width / 2,
          0, this.leftHands.width / 2, this.leftHands.height,
          this.x + 50, this.y + 100, 70, 100);
      this.context.drawImage(lighting, 130, 70, 250, 200);
    }
  }

  attack(target) {
    this.state = 'attacking';
    target.hp -= Math.floor(Math.random() * 15 + 10);
    sound.lightingSound.play();
    setTimeout(() => {
      this.state = 'idle';
    }, 400);
  }
}