
module.exports.id = '4b764554.3a9cec';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow 4b764554.3a9cec update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"4b764554.3a9cec","type":"flows"}, {
    $set: {"path":"4b764554.3a9cec","body":[{"id":"81608156.a74c9","type":"catch","z":"4b764554.3a9cec","name":"","scope":null,"x":100,"y":180,"wires":[["8f8c1bb7.feb598","141199b1.0a4c96"]]},{"id":"2c2f926b.890f1e","type":"http response","z":"4b764554.3a9cec","name":"","statusCode":"","x":557,"y":181,"wires":[]},{"id":"8f8c1bb7.feb598","type":"function","z":"4b764554.3a9cec","name":"transform","func":"\nlet factories = global.get(\"factories\"); \n\nmsg.payload = factories.messages.generic.fail;\n\nif (msg.statusCode == '401')\n    msg.payload = factories.messages.generic.failAuth;\n\nreturn msg;","outputs":1,"noerr":0,"x":341,"y":180,"wires":[["2c2f926b.890f1e"]]},{"id":"65dabc88.459d94","type":"http in","z":"4b764554.3a9cec","name":"get manager list by token","url":"/events/mint/managerListByToken","method":"get","upload":false,"swaggerDoc":"","x":130,"y":20,"wires":[["c2e90f71.0eea7"]]},{"id":"b0bb910a.558ac","type":"query-to-mongo","z":"4b764554.3a9cec","request_type":"0","name":"query-to-mongo","x":400,"y":80,"wires":[["e63ad54f.36b598"]]},{"id":"e63ad54f.36b598","type":"function","z":"4b764554.3a9cec","name":"transform params","func":"const _ = global.get('_');\nconst eventAddress = global.get('settings.events.address');\nconst eventToQueryConverter = global.get('libs.utils.converters.eventToQueryConverter');\nconst prefix = global.get('settings.mongo.collectionPrefix');\n\n\n\nmsg.symbols = Array.isArray(msg.payload.criteria.symbol) ? \nmsg.payload.criteria.symbol : [msg.payload.criteria.symbol];\n\n\nconst criteria = eventToQueryConverter('OwnershipChange', {\n    symbol: {$in: msg.symbols},\n    address: eventAddress\n});\n\nmsg.payload = {\n        model: `${prefix}TxLog`, \n        request: criteria\n    };\n\nreturn msg;","outputs":1,"noerr":0,"x":647.0000228881836,"y":80.00000476837158,"wires":[["eae6dc94.5ccf5"]]},{"id":"eae6dc94.5ccf5","type":"mongo","z":"4b764554.3a9cec","model":"","request":"","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":850,"y":80,"wires":[["4f597ea9.3f262"]]},{"id":"dbe41e9e.63366","type":"http response","z":"4b764554.3a9cec","name":"","statusCode":"","x":1210,"y":80,"wires":[]},{"id":"4f597ea9.3f262","type":"function","z":"4b764554.3a9cec","name":"","func":"const _ = global.get('_');\nconst queryResultToEventArgsConverter = global.get('libs.utils.converters.queryResultToEventArgsConverter');\n\nlet items = {};\nconst zero = \"0x0000000000000000000000000000000000000000\";\nlet managerList = {};\nmsg.payload = queryResultToEventArgsConverter('OwnershipChange', msg.payload)\n.sort((a, b) => {\n    if (a.includedIn.blockNumber === b.includedIn.blockNumber) {\n      return a.from !== zero;\n    }\n    return a.includedIn.blockNumber > b.includedIn.blockNumber;\n  }).map((item) => {\n      if (!managerList[item.from]) {\n          managerList[item.from] = 0\n      }\n      if (!managerList[item.to]) {\n          managerList[item.to] = 0\n      }\n      \n    managerList[item.from] -= 1;\n    managerList[item.to] += 1;\n  });\n\nmsg.payload = Object.entries(managerList).filter(item => item[1] > 0).map(item => item[0]);\nreturn msg;","outputs":1,"noerr":0,"x":1030,"y":80,"wires":[["dbe41e9e.63366"]]},{"id":"141199b1.0a4c96","type":"debug","z":"4b764554.3a9cec","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"error","x":250,"y":340,"wires":[]},{"id":"c2e90f71.0eea7","type":"laborx_auth","z":"4b764554.3a9cec","name":"laborx_auth","configprovider":"1","dbAlias":"accounts","providerpath":"http://localhost:3001","x":220,"y":80,"wires":[["b0bb910a.558ac"]]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"4b764554.3a9cec","type":"flows"}, done);
};
