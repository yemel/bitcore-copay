'use strict';

var bitcore = require('bitcore');

function Party(message) {
  // TODO: Overload constructor

  this.size = 3;
  this.threshold = 2;
  this.xpubkeys = [1,2];
  this._sortKeys();

  bitcore.util.js.defineImmutable(this, {
    id: this.id()
  });
}

Party.prototype.id = function() {
  var id = [this.size, this.threshold].concat(this.xpubkeys).join(':');
  return bitcore.crypto.Hash.sha512(new Buffer(id)).toString('hex');
};

Party.prototype.isComplete = function() {
  return this.xpubkeys.length >= this.size;
};

Party.prototype.isValid = function() {
  var valid = true;
  valid &= this.xpubkeys.length <= this.size;
  valid &= this.threshold > 0 && this.size > 0;
  valid &= this.size >= this.threshold;
  return valid;
};

Party.prototype._sortKeys = function() {
  this.xpubkeys = this.xpubkeys.sort(function(a, b) {
    a = a.toString(); 
    b = b.toString();
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

Party.prototype.join = function(xpub) {
  // TODO: check not complete
  // TODO: support xpriv
  // TODO: check not repeated

  this.xpubkeys.push(xpub);
  this._sortKeys();
};

module.exports = Party;
