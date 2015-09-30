var merge = require('merge');
var addScaleWithAnchor = require('./mixins/addScaleWithAnchor');

module.exports = function(opts) {

  opts = merge({}, opts);
  opts.width = opts.width || 200;
  opts.arrowWidth = opts.arrowWidth || 20;
  opts.arrowHeight = opts.arrowHeight || 20;
  opts.textWidth = opts.textWidth || 200;
  opts.transitions = opts.transitions || [
    { 
      from: 'idle', to: 'rolled', animation: {
        duration: 0.25
      } 
    },
    { 
      from: 'rolled', to: 'idle', animation: {
        duration: 0.25
      } 
    },
    { 
      from: 'out', to: 'idle', animation: {
        duration: 0.1
      } 
    },
    { from: 'idle', to: 'out', animation: {
        duration: 0.1
      } 
    }
  ];
  opts.arrowStartColor = opts.arrowStartColor || [255, 0, 0];
  opts.arrowEndColor = opts.arrowEndColor || [0, 255, 255];
  opts.parseArrowColor = opts.parseArrowColor || function(item, data) {
    // check if this a dom element and if arrowColor exists since not all
    // states have arrowColor defined
    if(item.style && data.arrowColor) {
      item.style.backgroundColor = 'rgb(' + data.arrowColor.join(',') + ')';
    }
  };

  var arrowX = opts.width - 10 - opts.arrowWidth;
  var arrowY = ( opts.height - opts.arrowHeight ) * 0.5;
  var textX = ( arrowX - opts.textWidth ) * 0.5;
  var textY = ( opts.height - opts.textHeight ) * 0.5;
  var tempOpts;

  opts.states = {
    out: {
      bg1: {},

      bg2: {},

      text: {
        position: [ textX, textY, 0 ],
        color: [ 255, 255, 255 ]
      },

      arrow: {
        position: [ arrowX, arrowY, 0 ],
        arrowColor: opts.arrowStartColor
      }
    },

    idle: {
      bg1: {},

      bg2: {},

      text: {
        position: [ textX, textY, 0 ],
        color: [ 255, 255, 255 ]
      },

      arrow: {
        position: [ arrowX, arrowY, 0 ],
        arrowColor: opts.arrowStartColor
      }
    },

    rolled: {

      bg1: {},

      bg2: {},

      text: {
        position: [ textX, textY, 0 ],
        color: [ 255, 0, 255 ]
      },

      arrow: {
        position: [ arrowX, arrowY, 0 ],
        arrowColor: opts.arrowEndColor      
      }
    }
  };

  // add in scaling of bg1
  opts.from = ['out', 'idle'];
  opts.to = 'rolled';
  opts.ui = 'bg2';
  opts.anchor = [1, 0.5];
  opts.scaleStart = [0, 1];
  opts.scaleEnd = [1, 1];
  addScaleWithAnchor(opts);

  // add the special case for handling arrow colour to parsers
  // this would be to check if we're on the dom
  if(opts.parsers) {
    opts.parsers.push(opts.parseArrowColor);  
  }
  
  return {
    states: opts.states,
    transitions: opts.transitions,
    parsers: opts.parsers,
    targets: opts.targets
  };
};