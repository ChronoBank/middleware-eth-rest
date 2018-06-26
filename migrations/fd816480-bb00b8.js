
module.exports.id = 'fd816480.bb00b8';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow fd816480.bb00b8 update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"fd816480.bb00b8","type":"flows"}, {
    $set: {"path":"fd816480.bb00b8","body":[{"id":"a3affcb5.14578","type":"http in","z":"fd816480.bb00b8","name":"sc create","url":"/sc","method":"post","upload":false,"swaggerDoc":"","x":160,"y":140,"wires":[["771c4544.c5ba3c"]]},{"id":"4c8b8f08.ca0e9","type":"http response","z":"fd816480.bb00b8","name":"","statusCode":"","x":565.5,"y":134.75,"wires":[]},{"id":"771c4544.c5ba3c","type":"async-function","z":"fd816480.bb00b8","name":"super2","func":"const factories = global.get('factories');\nconst _ = global.get('_');\nconst web3 = global.get('web3');\nconst contract = global.get('truffle-contract');\n\n    const accounts = await Promise.promisify(web3.eth.getAccounts)(),\n    callContract = contract(factories.sm.UserManager);\n    \n    \n      callContract.setProvider(web3.currentProvider);\n      let callContractInstance = await callContract.deployed();\n\n\n    msg.payload.args.push({\n            from: msg.payload.from,\n            gas: 3000000\n          });\n\n      let call = await Promise.promisify(web3.eth.contract(factories.sm.UserManager.abi)\n        .at(callContractInstance.address).addCBE.call)(...msg.payload.args);\n          \n      let hash = await web3.eth.contract(factories.sm.UserManager.abi)\n      .at(callContractInstance.address).addCBE.getData(...msg.payload.args);\n              \n\nconst nonce = await Promise.promisify(web3.eth.getTransactionCount)(msg.payload.from);\nconst gasPrice = await Promise.promisify(web3.eth.getGasPrice)();\n\nconst txParams = {\n  nonce: web3.toHex(nonce),\n  gasPrice: web3.toHex(gasPrice),\n  gasLimit: web3.toHex(3000000),\n  to: '0x0000000000000000000000000000000000000000',\n  value: '0x00',\n  data: hash\n}\n              \n              \n    msg.payload = {\n        txParams: txParams,\n        call: call\n    };          \n              \nreturn msg;","outputs":1,"noerr":7,"x":349.99999237060547,"y":133,"wires":[["4c8b8f08.ca0e9"]]},{"id":"a8f6c88d.c37398","type":"http in","z":"fd816480.bb00b8","name":"sc broadcast","url":"/sc/broadcast","method":"post","upload":false,"swaggerDoc":"","x":167,"y":250,"wires":[["b5773e2.44d9ec","bba18ffb.8868d"]]},{"id":"87b2893b.7534c8","type":"http response","z":"fd816480.bb00b8","name":"","statusCode":"","x":564.5,"y":252.75,"wires":[]},{"id":"b5773e2.44d9ec","type":"async-function","z":"fd816480.bb00b8","name":"","func":"const factories = global.get('factories');\nconst _ = global.get('_');\nconst web3 = global.get('web3');\n\nnode.log('inside!');\nlet result = await Promise.promisify(web3.eth.sendRawTransaction)(msg.payload.tx).timeout(1000);\nlet blockConfirmations = 1;\n\nawait new Promise(res=>{ \n let filter = web3.eth.filter('latest');\n filter.watch(async function(err, blockHash) {\n    if (blockConfirmations>2) {\n      await Promise.promisify(filter.stopWatching).bind(filter)();\n      filter = null;\n      console.warn('!! Tx expired !!');\n      return res();\n    }\n    blockConfirmations++;\n\n  });\n});\n\nmsg.payload = {\n    result: result\n}\n\nreturn msg;","outputs":1,"noerr":11,"x":350,"y":260,"wires":[["87b2893b.7534c8","bba18ffb.8868d"]]},{"id":"d8b9de89.6651b","type":"catch","z":"fd816480.bb00b8","name":"","scope":null,"x":155,"y":566,"wires":[["637d8fb0.21672"]]},{"id":"2239c80.b55f838","type":"http response","z":"fd816480.bb00b8","name":"","statusCode":"","x":612,"y":567,"wires":[]},{"id":"637d8fb0.21672","type":"function","z":"fd816480.bb00b8","name":"transform","func":"\nlet factories = global.get(\"factories\"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;","outputs":1,"noerr":0,"x":396,"y":566,"wires":[["2239c80.b55f838"]]},{"id":"bba18ffb.8868d","type":"debug","z":"fd816480.bb00b8","name":"","active":true,"console":"false","complete":"false","x":516,"y":198,"wires":[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"fd816480.bb00b8","type":"flows"}, done);
};
