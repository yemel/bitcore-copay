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

  it('reports error when joining a full ring', function() {
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
  });

  it('allow deriving addresses', function() {
    var message = '{"size":3,"threshold":2,"xpublicKeys":["xpub661MyMwAqRbcG4jDrr5Sg9K5PJfWQHoJCRX8NXQeNznxu3JN3558UML3G83zByZC3vWnVPvJy7M5oTHGLQmQVLkTpfkCqMCn2Afbai2Wcrc","xpub661MyMwAqRbcGWYt7hxPZ6H3vWUiCSzvce12fqcxRkGJ6NdKhLxfiCRemvaVxcAYvjcTmAGa2WS46qMC68TG9S7JvxUDSvjSqbZFmuj7yT5","xpub661MyMwAqRbcGuTuYp8WnRGKVn7KnnqBGg6NPR8TVDN5Y6wR5o8XHqGCJAXUA7txRA8UKMfPshVkDSK2uegMXksZxSsAjxCxtVjfDrTXdWS"]}';
    var ring = new Ring(message);
    var address = ring.deriveAddress('m/0/1');
    address.toString().should.equal('34k2t8vKQB73TxorBtwiSmY2AReVfQG2bL');
  });

  it('allow deriving addresses', function() {
    var message = '{"size":3,"threshold":2,"xpublicKeys":["xpub661MyMwAqRbcG4jDrr5Sg9K5PJfWQHoJCRX8NXQeNznxu3JN3558UML3G83zByZC3vWnVPvJy7M5oTHGLQmQVLkTpfkCqMCn2Afbai2Wcrc","xpub661MyMwAqRbcGWYt7hxPZ6H3vWUiCSzvce12fqcxRkGJ6NdKhLxfiCRemvaVxcAYvjcTmAGa2WS46qMC68TG9S7JvxUDSvjSqbZFmuj7yT5","xpub661MyMwAqRbcGuTuYp8WnRGKVn7KnnqBGg6NPR8TVDN5Y6wR5o8XHqGCJAXUA7txRA8UKMfPshVkDSK2uegMXksZxSsAjxCxtVjfDrTXdWS"]}';
    var ring = new Ring(message);
    var address = ring.deriveAddress(['m/0/1', 'm/1/1', 'm/2/1']);
    address.toString().should.equal('3PRHvHCnpKHLh6aPiURTzLc2LLmg5WNuFT');
  });

});
