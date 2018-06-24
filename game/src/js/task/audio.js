const wordsForAudio = require('./data/wordsForAudio');
import {arrayRandomNumber} from '../utils/utils';

export class AudioTask {
  constructor(modal) {
    this.currentWord = wordsForAudio[arrayRandomNumber(wordsForAudio)];
    this.synth = window.speechSynthesis;
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = 'en-GB';
    this.speech.text = this.currentWord;
    this.modal = modal;
    this.render();
  }

  render() {
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

    this.modal.appendChild(playBtn);
    this.modal.appendChild(description);
    form.appendChild(answer);
    form.appendChild(submit);
    this.modal.appendChild(form);
  }
}