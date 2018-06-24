import Game from './game';

const welcome = document.querySelector('.welcome');
const name = document.getElementById('name');
const submit = document.getElementById('submitName');

submit.addEventListener('click', e => {
  e.preventDefault();
  const game = new Game();
  game.initNps({
        context: game.context,
        width: 300,
        height: 342,
        imageSrc: './src/img/girl-min.png',
        frameWidth: 651,
        frameHeight: 542,
        x: 100,
        y: 250,
        hp: 100,
        name: name.value,
        ticksPerFrame: 4,
        numberOfFrames: 13,
      },
      {
        context: game.context,
        x: 800,
        y: 250,
      });
  game.gameLoop();

  welcome.remove();
});
