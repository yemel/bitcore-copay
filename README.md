# Married Walltes for bitcore

A library for sharing funds between a set of members.

```javascript
var bitcore = require('bitcore');
var Party = require('bitcore-party');

var message = require('./messages').partyProposal;
var party = new Party(walletMessage);
console.log(party.size, party.threshold, party.isComplete()); // 3, 2, false

var xprivate = new bitcore.HDPrivateKey();
party.join(xprivate);
var message = party.serialize();

party.use(myDerivationStrategy);
var address = party.getAddress();
```