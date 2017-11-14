/**
 * Chronobank/eth-rest 
 * @module service/deregisterAddrService
 * @requires models/accountModel
 * @requires utils/authenticate
 * @requires factories/genericMessageFactory
 * @returns {undefined}
 */

const accountModel = require('../../models/accountModel'),
  auth = require('../../utils/authenticate'),
  messages = require('../../factories/messages/genericMessageFactory');

module.exports = async (req, res) => {

  if (!req.body.address)
    return res.send(messages.fail);

  try {
    await accountModel.remove({address: req.body.address});
    if(!auth.isOwner(res, req.body.address))
      throw new Error('Not owner');
  } catch (e) {
    return res.send(messages.fail);
  }
  res.send(messages.success);
};
