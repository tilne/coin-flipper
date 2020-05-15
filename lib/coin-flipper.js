'use babel';

import CoinFlipperView from './coin-flipper-view';
import { CompositeDisposable } from 'atom';

export default {

  coinFlipperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.coinFlipperView = new CoinFlipperView(state.coinFlipperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.coinFlipperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'coin-flipper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.coinFlipperView.destroy();
  },

  serialize() {
    return {
      coinFlipperViewState: this.coinFlipperView.serialize()
    };
  },

  toggle() {
    console.log('CoinFlipper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
