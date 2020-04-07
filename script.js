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
  { code: 'Enter', eng: 'Enter', rus: 'Enter'},

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
  { code: 'Space', eng: ' ', rus: ' '},
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
    console.log(index);
    if (index != -1) {
      this.elements.keys[index].click();

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

      switch(key.code) {
        case 'Backspace':
          keyElement.textContent = key.eng;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.elements.textarea.value = this.properties.value;
          });
          break;
          case 'Space':
            keyElement.textContent = 'SPACE';
            keyElement.classList.add('keybiard__key_extra_wide');
            keyElement.addEventListener('click', () => {
              this.properties.value += key.eng.toLowerCase();
              this.elements.textarea.value = this.properties.value;
            });
            break;
        default:
          keyElement.textContent = key.eng.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += key.eng.toLowerCase();
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


   pressKeys(){
    let index = keysLayout.findIndex((key) => key.code == event.code);
    console.log(index);
    if (index != -1) {
      //let pressedKey = this.elements.keys[index];
      console.log(this.properties.value)

    }
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
      console.log(this.elements.keys)
  }
  },

  
  typeKeys(initialValue, oninput) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
  }


  // clickButtonHandler() {
  //   document.addEventListener('keydown', function(event) {
  //     if(event)
  //   })
  // }

};

window.addEventListener('DOMContentLoaded', function() {
  Keyboard.init();
});