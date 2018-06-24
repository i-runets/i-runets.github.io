export class ToBin {
  constructor(modal) {
    this.modal = modal;
    this.number = Math.floor(Math.random() * 10) + 5;
    this.render();
  }

  render() {
    const description = document.createElement('p');
    description.textContent = `Перевелите число ${this.number} в двоичную систему счисления`;

    const form = document.createElement('form');

    const answer = document.createElement('input');
    answer.required = true;
    answer.type = 'text';
    answer.classList.add('answer');

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submitBtn');
    submit.value = 'OK';

    form.appendChild(answer);
    form.appendChild(submit);
    this.modal.appendChild(description);
    this.modal.appendChild(form);
  }
}