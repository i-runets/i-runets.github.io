import Spell from '../spell/spell';
import {bodyParts} from './monsterBodyParts';

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
    this.breathInc = 0.05;
    this.breathAmt = 0;
    this.breathMax = 2;
    this.spell = new Spell().spells.lighting;
    this.generateBody();
    this.generateName();
  }

  generateName() {
    const firstName = [
      'ужасный',
      'глупый',
      'трусливый',
      'сопливый',
      'крутой',
      'кучерявый',
    ];
    const middleName = [
      'троль',
      'эльф',
      'зомби',
      'огр',
      'гном',
      'гоблин',
      'человек',
    ];
    const lastName = [
      'том',
      'макс',
      'дима',
      'джек',
      'вася',
      'саша',
      'катя',
      'таня',
    ];

    const a = Math.floor(Math.random() * firstName.length);
    const b = Math.floor(Math.random() * middleName.length);
    const c = Math.floor(Math.random() * lastName.length);

    this.name = `${firstName[a]} ${middleName[b]} ${lastName[c]}`.replace(
        /(?:^|\s)\S/g, a => a.toUpperCase());
  }

  generateHealth(rounds) {
    this.hp = 40 + rounds * 15;
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

  render() {
    this.update();
    this.context.fillStyle = '#382B5F';
    this.context.fillText(this.name, this.x + 70, this.y - 60);
    this.context.fillStyle = 'red';
    this.context.fillText(`${this.hp} HP`, this.x + 70, this.y - 20);
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
    }
  }
}