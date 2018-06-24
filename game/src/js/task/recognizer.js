const words = require('./data/wordsForRecognizer');
import {arrayRandomNumber} from '../utils/utils';

export class Recognizer {
  constructor(modal) {
    this.modal = modal;
    this.currentWord = words[arrayRandomNumber(words)];
    this.result;
    this.reco = new webkitSpeechRecognition();
    this.reco.interimResults = true;
    this.reco.lang = 'en-US';
    this.count = 0;
    this.render();
  }

  render() {
    const description = document.createElement('p');
    description.textContent = `Произнесите слово ${this.currentWord} (3 попытки)`;

    const answer = document.createElement('p');
    answer.classList.add('answer', 'recognizer');
    this.reco.onresult = e => {
      this.result = e.results[e.resultIndex];
      if (this.result.isFinal) {
        if (this.count >= 2) {
          playBtn.disabled = true;
          playBtn.style.color = 'grey';
        }
        answer.textContent = this.result[0].transcript;
        this.count++;
      }
    };

    const playBtn = document.createElement('button');
    playBtn.textContent = 'Press me';
    playBtn.classList.add('playBtn');
    playBtn.addEventListener('click', e => {
      this.reco.start();
    });

    const submit = document.createElement('button');
    submit.classList.add('submitBtn');
    submit.textContent = 'OK';

    this.modal.appendChild(playBtn);
    this.modal.appendChild(description);
    this.modal.appendChild(answer);
    this.modal.appendChild(submit);
  }
}