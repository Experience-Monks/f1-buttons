var merge = require('merge');
var addMoveAndFade = require('./mixins/addMoveAndFade');

module.exports = function(opts) {

  opts = merge({}, opts);
  opts.states = opts.states || {
    out: {},
    idle: {},
    rolled: {}
  };
  opts.transitions = opts.transitions || [
    { from: 'out', to: 'idle' },
    { from: 'idle', to: 'out' },
    { 
      from: 'idle', 
      to: 'rolled', 
      animation: {
        text1: {
          duration: 2.5,
          delay: 2.5
        },
        text2: {
          duration: 5
        }
      } 
    },
    { 
      from: 'rolled', 
      to: 'idle', 
      animation: {
        duration: 0.1
      } 
    }
  ];
  opts.height = opts.height || 60;
  opts.nameText1 = opts.nameText1 || 'text1';
  opts.nameText2 = opts.nameText2 || 'text2';
  opts.moveAmount = opts.moveAmount || [0, 20, 0];
  
  var positiveMove = opts.moveAmount.slice();
  var negativeMove = opts.moveAmount.map( function(value) {
    return value * -1;
  });

  addUIToStates(opts, opts.nameText1);
  addUIToStates(opts, opts.nameText2);

  opts.ui = opts.nameText1;
  opts.from = 'idle';
  opts.to = 'rolled';
  opts.moveAmountFrom = [0, 0, 0];
  opts.moveAmountTo = negativeMove;
  opts.alphaFrom = 1;
  opts.alphaTo = 0;
  addMoveAndFade(opts);

  opts.ui = opts.nameText2;
  opts.from = 'idle';
  opts.to = 'rolled';
  opts.moveAmountFrom = positiveMove;
  opts.moveAmountTo = [0, 0, 0];
  opts.alphaFrom = 0;
  opts.alphaTo = 1;
  addMoveAndFade(opts);

  return {
    targets: opts.targets,
    states: opts.states,
    transitions: opts.transitions,
    parsers: opts.parsers
  };
};

function addUIToStates(states, uiName) {

  // the following is to handle if options with states
  // are passed in
  states = states.states || states;

  for(var stateName in states) {
    if(!states[ stateName ][ uiName]) {
      states[ stateName ][ uiName ] = {};
    }  
  }
}