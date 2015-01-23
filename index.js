var bitcore = require('bitcore');
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;

module.exports = {
  Ring: require('./lib/ring')
}