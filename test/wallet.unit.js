
var copay = require('../');
var bitcore = require('bitcore');

describe('wallet', function() {

  var ring = new copay.Ring(fs.readFileSync('example.ring'));
  var privkey = new bitcore.HDPrivateKey(fs.readFileSync('xpriv1.key'));

  var address1Path = 'm/1';
  var address2Path = 'm/1';

  var amount = 10000;

  var address1 = ring.deriveAddress(address1Path);
  var address2 = ring.deriveAddress(address2Path);
  var address1Message  = new copay.Message.Address({ path: address1Path, address: address1 });
  var address2Message  = new copay.Message.Address({ path: address2Path, address: address2 });

  var transaction = new bitcore.Transaction().to(address1, amount);
  var txMessage = new copay.Message.Transaction({
    raw: transaction.serialize(/* unsafe */ true),
    id: transaction.id
  });

  describe('watching addresses', function() {

    var wallet;

    beforeEach(function() {
      wallet = new copay.Wallet(ring);
    });

    it('adds an address on an Address message', function() {

      wallet.apply(address1Message);
      expect(wallet.addresses[address1]).to.exist();
    });

  });

  describe('receiving transactions', function() {

    var wallet;

    beforeEach(function() {
      wallet = new copay.Wallet(ring);
    });

    it('processes a transaction that adds outputs to a known address', function() {
      wallet.apply(address1Message);
      wallet.apply(txMessage);
      expect(wallet.addresses[address1].balance).to.equal(amount);
      expect(wallet.transactions[transaction.id]).to.exist();
    });

  });

  describe('transaction proposals', function() {

    var wallet;

    beforeEach(function() {
      wallet = new copay.Wallet(ring);
    });

    it('processes a transaction proposal that is an internal move', function() {

      var proposedTx = new bitcore.Transaction()
        .from(transaction)
        .to(address2, amount);

      var txProposal = new copay.Message.TransactionProposal({
        ringId: ring.id,
        timestamp: new Date().getTime(),
        message: 'Test',
        owner: privkey.xpubkey,
        raw: proposedTx.serialize(/* unsafe */ true),
        input_metadata: [{
          path: address1Path
        }],
        output_metadata: [{
          path: address2Path
        }]
      });

      wallet.apply(address1Message);
      wallet.apply(address2Message);
      wallet.apply(txMessage);
      wallet.apply(txProposal);

      expect(_.size(wallet.proposals)).to.equal(1);
    });

  });
});

