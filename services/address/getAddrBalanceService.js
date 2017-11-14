/**
 * Chronobank/eth-rest 
 * @module service/getAddrBalanceService
 * @requires models/accountModel
 * @returns {undefined}
 */

const accountModel = require('../../models/accountModel'),
  _ = require('lodash');

module.exports = async (req, res) => {

  let account = await accountModel.findOne({address: req.params.addr});

  res.send({
    balance: _.get(account, 'balance', 0),
    erc20token: _.get(account, 'erc20token', {})
  });

};
