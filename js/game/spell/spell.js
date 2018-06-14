export default class Spell {
  constructor() {
    this.spells = Spell.generateSpells();
  }

  static generateSpells() {
    const obj = {};
    const lighting = new Image();
    lighting.src = './img/game/cloud.png';

    const heal = new Image();
    heal.src = './img/game/heal.png';

    const bullet = new Image();
    bullet.src = './img/game/hit.png';
    
    obj.lighting = lighting;
    obj.heal = heal;
    obj.bullet = bullet;
    return obj;
  }
}