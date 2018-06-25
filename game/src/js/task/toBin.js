export class ToBin {
  constructor() {
    this.number = Math.floor(Math.random() * 10) + 5;
    this.isAnswered = '';
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');
    document.body.appendChild(qWrapper);
    const modal = document.createElement('div');
    modal.classList.add('task');
    qWrapper.appendChild(modal);
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
    modal.appendChild(description);
    modal.appendChild(form);

    modal.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target === submit) {
        if (parseInt(answer.value.trim().toLowerCase(), 2) ===
            this.number) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}