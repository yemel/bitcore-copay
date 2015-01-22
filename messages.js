'use strict';

var bitcore = require('bitcore');
var Signature = bitcore.crypto.Signature;

var xpriv1 = 'xprv9s21ZrQH143K2Chvv8gJtX6He59XaFtVzWAfF7S14a6JaFxkGGFTUM7pNAkhgeNTPQguNRV19PRqfwLAiuX2BchWWssEPYtfiwG4BqCKiXf';
var xpriv2 = 'xprv9s21ZrQH143K2QJrJVhEbYzCo9e9chYrRcSPmowfPYn9RxkUAUjE5wwhssg2bEQByQjPUM3w4pywLWZfUJsB2Ah5ST5dsk2D64k6A9dJb64';

var messages = {}

messages.party = {
  size: 3,
  threshold: 2,
  xpubkeys: [xpriv1, xpriv2]
};

messages.transaction = {
  party_id: 'some party id',
  raw_tx: 'some transaction',
  input_metadata: [
    {path: "m/0/1", sighash: Signature.SIGHASH_ALL}
  ],
  output_metadata: [null, null],
  previous_transactions: ['raw_tx1', 'raw_tx2'],
  competing_transaction: 'txp_id',
  payment_protocol: [],
  message: "this is a proposal",
  timestamp: 1419934167279
};

messages.derivation = {
  party_id: 'some party id',
  path: 'm/0/12',
  address: '1bitcoinaddress'
};

module.exports = messages;
