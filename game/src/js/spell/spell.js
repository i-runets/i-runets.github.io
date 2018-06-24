import {spellsIcon} from './spellIcons';
import {Task} from '../task/task';

export default class Spell {
  constructor(src) {
    this.isSpellSelected = false;
    this.selectedSpell = '';
    this.chooseSpell();
  }

  chooseSpell() {
    const spellWindowWrapper = document.createElement('div');
    spellWindowWrapper.classList.add('spellWrapper');
    const spellWindow = document.createElement('div');
    spellWindow.classList.add('spell');
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'OK';
    const spellList = document.createElement('div');
    spellList.classList.add('spellList');
    spellWindow.appendChild(spellList);
    spellWindowWrapper.appendChild(spellWindow);

    for (const spell in spellsIcon) {
      if (spellsIcon.hasOwnProperty(spell)) {
        const label = document.createElement('label');
        const img = new Image();
        img.src = './src/img/icon_spell_' + spell + '.png';
        label.setAttribute('for', spell);
        const spellSelect = document.createElement('input');
        spellSelect.type = 'radio';
        spellSelect.name = 'spell';
        spellSelect.setAttribute('id', spell);
        label.appendChild(spellSelect);
        label.appendChild(img);
        spellList.appendChild(label);
      }
    }

    spellWindow.appendChild(submit);
    document.body.appendChild(spellWindowWrapper);

    submit.addEventListener('click', e => {
      e.preventDefault();
      const spells = document.querySelectorAll('.spellList input');
      for (let i = 0; i < spells.length; i++) {
        if (spells[i].checked) {
          this.selectedSpell = spells[i].id;
        }
      }
      this.isSpellSelected = true;
      this.hide();
    });
  }

  show() {
    document.body.querySelector('.spellWrapper').style.display = 'flex';
  }

  hide() {
    document.body.querySelector('.spellWrapper').style.display = 'none';
  }
}
