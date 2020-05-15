'use babel';

import CoinFlipperView from './coin-flipper-view';
import { CompositeDisposable } from 'atom';
import fetch from 'node-fetch';

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
      'coin-flipper:flip': () => this.flip()
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

  flipAndShow() {
    this.testFlipResultFetch();
    fetch('http://flipacoinapi.com/json')
      .then(function(res) {
        console.log(res.ok);
        return res.json();
      })
      .then(json => this.coinFlipperView.setMessageText(json));
    this.modalPanel.show();
  },

  hide() {
    this.coinFlipperView.setMessageText('');
    this.modalPanel.hide();
  },

  flip() {
    return (
      this.modalPanel.isVisible() ?
      this.hide() :
      this.flipAndShow()
    );
  }

};
