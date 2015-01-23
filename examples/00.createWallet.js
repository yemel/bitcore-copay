'use strict';

var bitcore = require('bitcore');
var copay = require('../');

var xpriv = new bitcore.HDPrivateKey('xprv9s21ZrQH143K2fiz3f7BM2tU53zwqQYGGG8JCzoN5UWpapnKh1LGZ1a4fVp93iSjWqzLu821ud7F1X83BLcrkAGBCmZRpe3rQCxyWaUgNF3');
var ring = new copay.Ring(3, 2, xpriv);

console.log('private key:', xpriv.toString());
console.log('ring id: ', ring.id);
console.log('serialize: ', ring.serialize());