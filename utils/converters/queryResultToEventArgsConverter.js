const _ = require('lodash'),
  BigNumber = require('bignumber.js');

const getTopic = arg => {
  let bn = BigNumber();
  bn.s = 1;
  bn.c = arg.c;
  bn.e = arg.e;
  let topic = bn.toString(16);
  while (topic.length < 40)
    topic = '0' + topic;
  return '0x' + topic;
};


const converter = (smEvents, eventName, queryResults) => {

  const signatures = _.chain(queryResults)
    .map(result => result.signature)
    .uniq()
    .value();

  const eventDefinitions = _.filter(smEvents, event => signatures.indexOf(event.signature) !== -1);

  if (!eventDefinitions.length)
    return [];

  let eventsMap = _.transform(eventDefinitions, (result, event) => {
    result[event.signature] = event;
  }, {});

  let indexedInputs = _.transform(eventDefinitions, (result, event) => {
    result[event.signature] = _.filter(event.inputs, {indexed: true});
  }, {});

  let indexedMap = _.transform(eventDefinitions, (result, event) => {

    result[event.signature] = _.chain(event.inputs)
      .transform((result, item, index) => {

        if (item.indexed) {
          let origIndex = _.findIndex(indexedInputs[event.signature], item);
          result[origIndex] = index;
        } else {
          let origIndex = _.chain(event.inputs)
            .filter({indexed: false})
            .findIndex(item)
            .value() + indexedInputs[event.signature].length;

          result[origIndex] = index;
        }

      }, {})
      .value();
  }, {});

  return queryResults
    .filter(item => eventsMap[item.signature] !== undefined)
    .map(item =>
    _.chain(item.args)
      .map((arg, index) => {
        let topicIndex = indexedMap[item.signature][index];


        const definition = eventsMap[item.signature].inputs[topicIndex];
        if (!definition)
          return {};


        let value = _.isString(arg) ? arg : getTopic(arg);

        if (new RegExp(/uint/).test(definition.type))
          value = BigNumber(value, 16);

        return {[definition.name]: value};

      })
      .transform((result, value) => _.merge(result, value), {})
      .merge({
        event: {
          name: eventsMap[item.signature].name,
          signature: item.signature
        },
        includedIn: {
          blockNumber: item.blockNumber,
          txIndex: item.txIndex,
          logIndex: item.index
        }
      })
      .value()
  );

};


module.exports = (smEvents)=>{
  return converter.bind(this, smEvents);
};
