'use strict';

var bitcore = require('bitcore');
var explorers = require('bitcore-explorers');

var blockchain = new explorers.Insight('testnet');

var message = fs.readFileSync('wallet.msg').toString();
var address = fs.readFileSync('address.msg').toString();

blockchain.getUnspentUtxos(address, function (err, utxo) {
  if (utxo.length === 0) return console.log('No UTXO for address:', address);

  var utxo = utxo[0];
  var transaction = new bitcore.Transaction().from(utxo).to('mkYY5NRvikVBY1EPtaq9fAFgquesdjqECw', 100000);
});