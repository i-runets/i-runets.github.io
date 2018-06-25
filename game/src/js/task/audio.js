const wordsForAudio = require('./data/wordsForAudio');
import {arrayRandomNumber} from '../utils/utils';

export class AudioTask {
  constructor() {
    this.currentWord = wordsForAudio[arrayRandomNumber(wordsForAudio)];
    this.synth = window.speechSynthesis;
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = 'en-GB';
    this.speech.text = this.currentWord;
    this.isAnswered;
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
    const playBtn = document.createElement('button');
    playBtn.classList.add('playBtn');
    playBtn.textContent = 'Play';

    const description = document.createElement('p');
    description.textContent = 'Введите услышаное слово';

    const form = document.createElement('form');

    const answer = document.createElement('input');
    answer.required = true;
    answer.type = 'text';
    answer.classList.add('answer');

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    modal.appendChild(playBtn);
    modal.appendChild(description);
    form.appendChild(answer);
    form.appendChild(submit);
    modal.appendChild(form);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === playBtn) {
        this.synth.speak(this.speech);
      }
      if (target === submit) {
        if (answer.value.trim().toLowerCase() === this.currentWord) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}