'use strict';

var fs = require('fs');
var bitcore = require('bitcore');
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;

var copay = require('../');

var xpriv = new bitcore.HDPrivateKey();
var ring = new copay.Ring(3, 2, xpriv);

fs.writeFileSync('xpriv1.key', xpriv.toString());
fs.writeFileSync('wallet.msg', ring.serialize());

console.log('ring id: ', ring.id);
console.log('serialize: ', ring.serialize());
