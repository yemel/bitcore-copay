'use strict';

var chai = require('chai');
var should = chai.should();

var bitcore = require('bitcore');
var copay = require('../');
var Ring = copay.Ring;

describe('Ring', function() {

  describe('constructor', function() {
    it('creates without key', function() {
      var ring = new Ring(3, 2);

      ring.size.should.equal(3);
      ring.threshold.should.equal(2);
      ring.xpublicKeys.length.should.equal(0);
    });

    it('creates with an initial hd private key', function() {
      var xpriv = new bitcore.HDPrivateKey();
      var ring = new Ring(3, 2, xpriv);

      ring.size.should.equal(3);
      ring.threshold.should.equal(2);
      ring.xpublicKeys.length.should.equal(1);
      ring.xpublicKeys[0].toString().should.equal(xpriv.hdPublicKey.toString());
    });

    it('creates with an initial hd public key', function() {
      var xpriv = new bitcore.HDPrivateKey();
      var ring = new Ring(3, 2, xpriv.hdPublicKey);

      ring.size.should.equal(3);
      ring.threshold.should.equal(2);
      ring.xpublicKeys.length.should.equal(1);
      ring.xpublicKeys[0].toString().should.equal(xpriv.hdPublicKey.toString());
    });

    it('creates from a serialized ring', function() {
      var message = '{"size":3,"threshold":2,"xpublicKeys":["xpub661MyMwAqRbcGQJSbD2gXPT1S8er6wAD6fERQrrEWJCTtnLqJ4agXo929sHxGc8mLd9VEDHC8Rd8pQbKxMsV5hTFhqyr791sNugsVpAJzgk"]}';
      var ring = new Ring(message);
      ring.size.should.equal(3);
      ring.threshold.should.equal(2);
      ring.xpublicKeys.length.should.equal(1);
      ring.xpublicKeys[0].toString().should.equal('xpub661MyMwAqRbcGQJSbD2gXPT1S8er6wAD6fERQrrEWJCTtnLqJ4agXo929sHxGc8mLd9VEDHC8Rd8pQbKxMsV5hTFhqyr791sNugsVpAJzgk');
    });
  });

  it('reports error when joining and the ring is full', function() {
    var ring = new Ring(2, 2);
    (function() {
      ring.join(new bitcore.HDPrivateKey());
    }).should.not.throw();
    (function() {
      ring.join(new bitcore.HDPrivateKey());
    }).should.not.throw();
    (function() {
      ring.join(new bitcore.HDPrivateKey());
    }).should.throw();
  })

});