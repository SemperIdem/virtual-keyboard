const keysLayout = [
  { code: 'Backquote', eng: '`', rus: 'ё'},
  { code: 'Digit1', eng: '1', rus: '1'},
  { code: 'Digit2', eng: '2', rus: '2'},
  { code: 'Digit3', eng: '3', rus: '3'},
  { code: 'Digit4', eng: '4', rus: '4'},
  { code: 'Digit5', eng: '5', rus: '5'},
  { code: 'Digit6', eng: '6', rus: '6'},
  { code: 'Digit7', eng: '7', rus: '7'},
  { code: 'Digit8', eng: '8', rus: '8'},
  { code: 'Digit9', eng: '9', rus: '9'},
  { code: 'Digit0', eng: '0', rus: '0'},
  { code: 'Minus', eng: '-', rus: '-'},
  { code: 'Equal', eng: '=', rus: '='},
  { code: 'Backspace', eng: 'Backspace', rus: 'Backspace'},

  { code: 'Tab', eng: 'Tab', rus: 'Tab'},
  { code: 'KeyQ', eng: 'q', rus: 'й'},
  { code: 'KeyW', eng: 'w', rus: 'ц'},
  { code: 'KeyE', eng: 'e', rus: 'у'},
  { code: 'KeyR', eng: 'r', rus: 'к'},
  { code: 'KeyT', eng: 't', rus: 'е'},
  { code: 'KeyY', eng: 'y', rus: 'н'},
  { code: 'KeyU', eng: 'u', rus: 'г'},
  { code: 'KeyI', eng: 'i', rus: 'ш'},
  { code: 'KeyO', eng: 'o', rus: 'щ'},
  { code: 'KeyP', eng: 'p', rus: 'з'},
  { code: 'BracketLeft', eng: '[', rus: 'х'},
  { code: 'BracketRight', eng: ']', rus: 'ъ'},
  { code: 'Delete', eng: 'DEL', rus: 'DEL'},

  { code: 'CapsLock', eng: 'Caps Lock', rus: 'Caps Lock'},
  { code: 'KeyA', eng: 'a', rus: 'ф' },
  { code: 'KeyS', eng: 's', rus: 'ы' },
  { code: 'KeyD', eng: 'd', rus: 'в' },
  { code: 'KeyF', eng: 'f', rus: 'а' },
  { code: 'KeyG', eng: 'g', rus: 'п' },
  { code: 'KeyH', eng: 'h', rus: 'р' },
  { code: 'KeyJ', eng: 'j', rus: 'о' },
  { code: 'KeyK', eng: 'k', rus: 'л' },
  { code: 'KeyL', eng: 'l', rus: 'д' },
  { code: 'Semicolon', eng: ';', rus: 'ж'},
  { code: 'Quote', eng: '\'', rus: 'э'},
  { code: 'Enter', eng: '\n', rus: '\n'},

  { code: 'ShiftLeft', eng: 'Shift', rus: 'Shift'},
  { code: 'IntlBackslash', eng: '\\', rus: '\\'},
  { code: 'KeyZ', eng: 'z', rus: 'я'},
  { code: 'KeyX', eng: 'x', rus: 'ч'},
  { code: 'KeyC', eng: 'c', rus: 'с'},
  { code: 'KeyV', eng: 'v', rus: 'м'},
  { code: 'KeyB', eng: 'b', rus: 'и'},
  { code: 'KeyN', eng: 'n', rus: 'т'},
  { code: 'KeyM', eng: 'm', rus: 'ь'},
  { code: 'Comma', eng: ',', rus: 'б'},
  { code: 'Period', eng: '.', rus: 'ю'},
  { code: 'ArrowUp', eng: '↑', rus: '↑'},
  { code: 'Slash', eng: '/', rus: '.'},

  
  { code: 'ControlLeft', eng: 'Ctrl', rus: 'Ctrl'},
  { code: 'MetaLeft', eng: 'Win', rus: 'Win'},
  { code: 'AltLeft', eng: 'Alt', rus: 'Alt'},
  { code: 'Space', eng: 'SPACE', rus: 'SPACE'},
  { code: 'ArrowLeft', eng: '←', rus: '←'},
  { code: 'ArrowDown', eng: '↓', rus: '↓'},
  { code: 'ArrowRight', eng: '→', rus: '→'},
]

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    textarea: null
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: "",
    capsLock: false,
    rus: false
  },

  init() {

    this.elements.textarea = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.textarea.classList.add('input-text')
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".input-text").forEach(element => {
      element.addEventListener("focus", () => {
          this.typeKeys(element.value, currentValue => {
              element.value = currentValue;
          });
      });
  });

  document.addEventListener('keydown', () => {
    event.preventDefault();
    let index = keysLayout.findIndex((key) => key.code == event.code);
    if (index != -1) {
      this.elements.keys[index].click();
      let pressedKey = this.elements.keys[index];
      pressedKey.classList.add('keyboard__key_pressed');

      if (event.shiftKey && event.altKey) {
        console.log(this.properties.rus);
        this.properties.rus = !this.properties.rus;
        console.log(this.properties.rus);
        let keyboard_keys = document.querySelector('.keyboard__keys');
        keyboard_keys.innerHTML = '';
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        
      }
    }
  });

  document.addEventListener('keyup', () => {
    let index = keysLayout.findIndex((key) => key.code == event.code);
    if (index != -1) {
      let pressedKey = this.elements.keys[index];
      pressedKey.classList.remove('keyboard__key_pressed');
    }
  });

  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    keysLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Delete', 'Enter', 'Slash', 'ArrowRight'].indexOf(key.code) != -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      let lang = this.properties.rus ? 'eng' : 'rus';
      if (this.properties.capsLock) {
        this.selectCapsLock();
      }
      console.log("which? " + lang)
      switch(key.code) {
        case 'Backspace':
          keyElement.textContent = '<==';
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.elements.textarea.value = this.properties.value;
          });
          break;
          case 'Space':
            keyElement.classList.add('keybiard__key_extra_wide');
            keyElement.addEventListener('click', () => {
              this.properties.value += ' ';
              this.elements.textarea.value = this.properties.value;
            });
            break;
          case 'Enter':
            keyElement.textContent = 'enter';
            keyElement.addEventListener('click', () => {
              this.properties.value += '\n';
              this.elements.textarea.value = this.properties.value;
            });
            break;
            case 'CapsLock':
              keyElement.textContent = 'Caps Lock';
              keyElement.addEventListener('click', () => {
                this.selectCapsLock();
              });
              break;
            case 'Delete':
              keyElement.textContent = 'del';
              keyElement.addEventListener('click', () => {
                this.properties.value = '';
                this.elements.textarea.value = this.properties.value;
              });
              break;
              case 'ShiftLeft':
                keyElement.textContent = 'shift';
                break;
              case 'MetaLeft':
                keyElement.textContent = 'win';
                break;
              case 'ControlLeft':
                keyElement.textContent = 'ctrl';
                break;
              case 'Tab':
                keyElement.textContent = 'tab';
                break;
              case 'AltLeft':
                keyElement.textContent = 'alt';
                break;


        default:
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key[lang].toUpperCase() : key[lang].toLowerCase();
            this.elements.textarea.value = this.properties.value;
          });
          break;
      }
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    
    });

    return fragment;
  },

  selectCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },
}

window.addEventListener('DOMContentLoaded', function() {
  const text = document.createElement('p');
  text.innerHTML = 'Клавиатура создана в WINDOWS 10. ' +'<br>'
      + ' Переключение языка: ALT + SHIFT';
  document.body.appendChild(text);
  Keyboard.init();
});