'use strict';

var bitcore = require('bitcore');

/**
 * Represents an ordered set of extended public keys and a threshold.
 */
function Ring(size, threshold, hdkey) {
  // TODO: Overload constructor

  if (!(this instanceof Ring)) {
    return new Ring(size, threshold, hdkey);
  }

  this.size = size;
  this.threshold = threshold;
  this.xpublicKeys = [];
  if (hdkey) {
    this.join(hdkey);
  }

  bitcore.util.js.defineImmutable(this, {
    id: this.id()
  });
}

Ring.prototype.id = function() {
  var id = [this.size, this.threshold].concat(this.xpublicKeys).join(':');
  return bitcore.crypto.Hash.sha512(new Buffer(id)).toString('hex');
};

Ring.prototype.isFull = function() {
  return this.xpublicKeys.length >= this.size;
};

Ring.prototype.isValid = function() {
  var valid = true;
  valid &= this.xpublicKeys.length <= this.size;
  valid &= this.threshold > 0 && this.size > 0;
  valid &= this.size >= this.threshold;
  return valid;
};

Ring.prototype.join = function(xpub) {
  var xpub = bitcore.HDPublicKey(xpub);
  this.xpublicKeys.push(xpub);
  this._sortKeys();
};

Ring.prototype._sortKeys = function() {
  this.xpublicKeys = this.xpublicKeys.sort(function(a, b) {
    a = a.toString(); 
    b = b.toString();
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

module.exports = Ring;
