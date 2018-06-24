const background = new Image();
background.src = './src/img/background.png';
const spellbook = new Image();
spellbook.src = './src/img/Spellbook.png';
const lighting = new Image();
lighting.src = './src/img/cloud.png';
const bullet = new Image();
bullet.src = './src/img/hit.png';
const heal = new Image();
heal.src = './src/img/heal.png';

const sound = {
  lightingSound: new Audio('./src/sound/lighting.mp3'),
  healSound: new Audio('./src/sound/heal.mp3'),
  gunSound: new Audio('./src/sound/gun.mp3'),
};

export {background, spellbook, sound, lighting, bullet, heal};