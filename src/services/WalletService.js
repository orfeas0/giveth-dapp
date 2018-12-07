import getWeb3 from '../lib/blockchain/getWeb3';
import getNetwork from '../lib/blockchain/getNetwork';

/**
 * Wallet service for operations with the giveth Wallet
 */
class WalletService {
  /**
   * Withdraw money from an acount to external address
   *
   * @param data Transaction data containing:
   *             from  Address from which the money is sendTransaction
   *             to    Address to which the ether should be sendTransaction
   *             value How much ether is being transfered
   * @param afterCreate Callback function once the transaction is broadcasted.
   *                    The function takes 2 parameters: Etherscan URL and transaction hash
   * @param afterMined  Callback function after the transaction has been mined
   * @param onError     Callback function for an onError
   */
  static withdraw(data, afterCreate = () => {}, afterMined = () => {}, onError = () => {}) {
    let txHash;
    let etherScanUrl;

    Promise.all([getWeb3(), getNetwork()])
      .then(([web3, network]) => {
        const dt = Object.assign({}, data, {
          from: data.from,
          value: web3.utils.toWei(data.value),
          gas: '21000',
        });
        etherScanUrl = network.etherscan;

        return web3.eth.sendTransaction(dt).once('transactionHash', hash => {
          txHash = hash;
          afterCreate(etherScanUrl, txHash);
        });
      })
      .then(afterMined)
      .catch(err => {
        if (txHash && err.message && err.message.includes('unknown transaction')) return; // bug in web3 seems to constantly fail due to this error, but the tx is correct
        onError(err);
      })
      .catch(onError);
  }
}

export default WalletService;
