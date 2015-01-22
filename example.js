'use strict';

var bitcore = require('bitcore');
var party = require('bitcore-party');

var walletMessage = require('./messages').wallet;

var xprivate = new bitcore.HDPrivateKey();
var party = new copay.Party(walletMessage, xprivate.publicKey);


party.use(myDerivationStrategy);
