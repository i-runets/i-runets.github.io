const words = require('./data/wordsForRecognizer');
import {arrayRandomNumber} from '../utils/utils';

export class Recognizer {
  constructor() {
    this.currentWord = words[arrayRandomNumber(words)];
    this.reco = new webkitSpeechRecognition();
    this.reco.interimResults = true;
    this.reco.lang = 'en-US';
    this.count = 0;
    this.render();
    this.isAnswered = '';
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
    const description = document.createElement('p');
    description.textContent = `Произнесите слово ${this.currentWord} (3 попытки)`;

    const answer = document.createElement('p');
    answer.classList.add('answer', 'recognizer');
    this.reco.onresult = e => {
      const result = e.results[e.resultIndex];
      if (result.isFinal) {
        if (this.count >= 2) {
          playBtn.disabled = true;
          playBtn.style.color = 'grey';
        }
        answer.textContent = result[0].transcript;
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

    modal.appendChild(playBtn);
    modal.appendChild(description);
    modal.appendChild(answer);
    modal.appendChild(submit);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        if (answer.textContent.trim().toLowerCase() ===
            this.currentWord) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}