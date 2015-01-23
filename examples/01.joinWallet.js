'use strict';

var fs = require('fs');
var bitcore = require('bitcore');
var copay = require('../');

var xpriv2 = new bitcore.HDPrivateKey();
var xpriv3 = new bitcore.HDPrivateKey();
var message = fs.readFileSync('wallet.msg').toString();

var ring = new copay.Ring(message);
ring.join(xpriv2);
ring.join(xpriv3);

fs.writeFileSync('xpriv2.key', xpriv2.toString());
fs.writeFileSync('xpriv3.key', xpriv3.toString());
fs.writeFileSync('wallet.msg', ring.serialize());

console.log('ring id: ', ring.id);
console.log('ring:', ring.serialize());
