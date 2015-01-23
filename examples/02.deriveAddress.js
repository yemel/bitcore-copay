'use strict';

var fs = require('fs');
var bitcore = require('bitcore');
var copay = require('../');

var message = fs.readFileSync('wallet.msg').toString();
var ring = new copay.Ring(message);
var address = ring.deriveAddress('m/0/1');

fs.writeFileSync('address.msg', address.toString());
console.log('fund:', address);


