'use babel';

export default class CoinFlipperView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('coin-flipper');

    // Create message element
    const message = document.createElement('div');
    message.classList.add('message');
    this.element.appendChild(message);
    this.setMessageText('');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  setMessageText(text) {
    this.element.firstChild.textContent = text;
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
