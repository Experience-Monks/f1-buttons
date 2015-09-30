var checkFromTo = require('../lib/checkFromTo');
var checkStates = require('../lib/checkStates');
var getStatesToApplyTo = require('../lib/getStatesToApplyTo');
var getUIToApplyTo = require('../lib/getUIToApplyTo');

module.exports = function(opts) {
  checkStates(opts);
  checkFromTo(opts);

  opts.moveAmountFrom = opts.moveAmountFrom === undefined ? [0, 20, 0] : opts.moveAmountFrom;
  opts.moveAmountTo = opts.moveAmountTo === undefined ? [0, 0, 0] : opts.moveAmountTo;
  opts.alphaFrom = opts.alphaFrom === undefined ? 1 : opts.alphaFrom;
  opts.alphaTo = opts.alphaTo === undefined ? 0 : opts.alphaTo;
  
  getStatesToApplyTo(opts, function(states) {

    getUIToApplyTo(opts.from, states, function(ui) {

      if(!ui.position) {
        ui.position = [0, 0, 0];
      }

      ui.position.forEach(function(value, i) {
        ui.position[ i ] = value + opts.moveAmountFrom[ i ];
      });

      ui.alpha = opts.alphaFrom;
    });

    getUIToApplyTo(opts.to, states, function(ui) { 

      if(!ui.position) {
        ui.position = [0, 0, 0];
      }

      ui.position.forEach(function(value, i) {
        ui.position[ i ] = value + opts.moveAmountTo[ i ];
      });

      ui.alpha = opts.alphaTo;
    });
  });

  return opts.states;
};