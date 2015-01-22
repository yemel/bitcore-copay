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

    // creates from invite
  });

});