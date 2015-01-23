'use strict';

var _ = require('lodash');
var bitcore = require('bitcore');

/**
 * Represents an ordered set of extended public keys and a threshold.
 */
function Ring(size, threshold, hdkey) {
  if (!(this instanceof Ring)) {
    return new Ring(size, threshold, hdkey);
  }

  // TODO: use info = {} pattern
  if (_.isString(size) && !threshold && !hdkey) {
    var message = JSON.parse(size);
    this.size = message.size;
    this.threshold = message.threshold;
    this.xpublicKeys = message.xpublicKeys.map(bitcore.HDPublicKey);
  } else if (Ring.isValid(size, threshold, hdkey)) {
    this.size = size;
    this.threshold = threshold;
    this.xpublicKeys = [];
    if (hdkey) this.join(hdkey);
  } else {
    throw new Error('Invalid Arguments');
  }

  // TODO: define immutable all properties
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

Ring.isValid = function(size, threshold, xpubkeys) {
  xpubkeys = _.isArray(xpubkeys) ? xpubkeys : [xpubkeys];
  // TODO: validate xpubkeys

  var valid = true;
  valid &= _.isNumber(size) && _.isNumber(threshold) && _.isArray(xpubkeys);
  valid &= threshold > 0 && size > 0 && size >= threshold;
  valid &= xpubkeys.length <= size;
  return valid;
};

Ring.prototype.join = function(xpub) {
  if (this.xpublicKeys.length >= this.size) {
    throw new Error('Ring is full');
  }

  var xpub = bitcore.HDPublicKey(xpub);
  this.xpublicKeys.push(xpub);
  this._sortKeys();
};

Ring.prototype.toObject = function() {
  var keys = this.xpublicKeys.map(function(k) {
    return k.toString();
  });

  return {
    size: this.size,
    threshold: this.threshold,
    xpublicKeys: keys
  };
};

Ring.prototype.serialize = function() {
  return JSON.stringify(this.toObject());
};

Ring.prototype.indexOf = function(hdkey) {
  var xpubkey = new bitcore.HDPublicKey(hdkey);
  var pubkeys = this.xpublicKeys.map(function(key) {
    return key.toString();
  });

  return pubkeys.indexOf(xpubkey.toString());
};

Ring.prototype.deriveAddress = function(path) {
  if (_.isArray(path) && path.length !== this.xpublicKeys.length) {
    throw new Error('Invalid paths');
  } else if (!_.isArray(path)) {
    path = this.xpublicKeys.map(function() { return path });
  }

  var pubkeys = _.zip(this.xpublicKeys, path).map(function(info) {
    return info[0].derive(info[1]).publicKey;
  });
  return new bitcore.Address(pubkeys, this.threshold);
};

Ring.prototype._sortKeys = function() {
  this.xpublicKeys = this.xpublicKeys.sort(function(a, b) {
    a = a.toString(); 
    b = b.toString();
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

module.exports = Ring;
