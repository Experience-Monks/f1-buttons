var checkFromTo = require('../lib/checkFromTo');
var checkStates = require('../lib/checkStates');
var getStatesToApplyTo = require('../lib/getStatesToApplyTo');
var getUIToApplyTo = require('../lib/getUIToApplyTo');

module.exports = function(opts) {
  checkStates(opts);
  checkFromTo(opts);

  opts.scaleStart = opts.scaleStart || [0, 0];
  opts.scaleEnd = opts.scaleEnd || [1, 1];
  opts.anchor = opts.anchor || [0, 0];
  
  getStatesToApplyTo(opts, function(states) {

    getUIToApplyTo(opts.from, states, function(ui) {
      ui.anchor = opts.anchor;
      ui.scale = opts.scaleStart;
    });

    getUIToApplyTo(opts.to, states, function(ui) { 
      ui.anchor = opts.anchor;
      ui.scale = opts.scaleEnd;
    });
  });

  return opts.states;
};