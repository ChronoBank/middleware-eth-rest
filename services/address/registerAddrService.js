const accountModel = require('../../models/accountModel'),
  messages = require('../../factories/messages/genericMessageFactory'),
  _ = require('lodash');

module.exports = async (req, res) => {
  req.body.erc20token = _.chain(req.body.erc20tokens)
    .transform((acc, addr) => {
      acc[addr] = 0;
    }, {})
    .value();
  let account = new accountModel(req.body);
  if (account.validateSync())
    return res.send(messages.fail);

  try {
    await account.save();
  } catch (e) {
    return res.send(messages.fail);
  }
  res.send(messages.success);
};