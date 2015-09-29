var f1 = require('f1');

module.exports = function(opts) {

  opts.width = opts.width || 200;
  opts.arrowWidth = opts.arrowWidth || 20;
  opts.arrowHeight = opts.arrowHeight || 20;
  opts.textWidth = opts.textWidth || 200;
  opts.arrowStartColor = opts.arrowStartColor || [255, 0, 0];
  opts.arrowEndColor = opts.arrowEndColor || [0, 255, 255];
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

  var arrowX = opts.width - 10 - opts.arrowWidth;
  var arrowY = ( opts.height - opts.arrowHeight ) * 0.5;
  var textX = ( arrowX - opts.textWidth ) * 0.5;
  var textY = ( opts.height - opts.textHeight ) * 0.5;

  var states = {};

  // add the special case for handling arrow colour to parsers
  if(opts.transitions) {
    opts.transitions.forEach( function(transition) {


    });
  }

  // this would be to check if we're on the dom
  if(opts.targets.arrow.style) {
    opts.parsers.push( function(item, data) {
      if(data.arrowColor) {
        item.style.backgroundColor = 'rgb(' + data.arrowColor.join(',') + ')';
      }
    });  
  }
  
  return f1(opts)
  .states( {
    out: {
      bg1: {
        alpha: 1,
        position: [ 0, 0, 0 ]
      },

      bg2: {
        alpha: 1,
        anchor: [ 1, 0 ],
        scale: [ 0, 1 ],
        position: [ 0, 0, 0 ]
      },

      text: {
        alpha: 1,
        position: [ textX, textY, 0 ],
        color: [ 255, 255, 255 ]
      },

      arrow: {
        alpha: 1,
        position: [ arrowX, arrowY, 0 ],
        arrowColor: opts.arrowStartColor
      }
    },

    idle: {
      bg1: {
        alpha: 1,
        position: [ 0, 0, 0 ]
      },

      bg2: {
        alpha: 1,
        anchor: [ 1, 0 ],
        scale: [ 0, 1 ]
      },

      text: {
        alpha: 1,
        position: [ textX, textY, 0 ],
        color: [ 255, 255, 255 ]
      },

      arrow: {
        alpha: 1,
        position: [ arrowX, arrowY, 0 ],
        arrowColor: opts.arrowStartColor
      }
    },

    rolled: {

      bg1: {
        alpha: 1,
        position: [ 0, 0, 0 ]
      },

      bg2: {
        alpha: 1,
        anchor: [ 1, 0 ],
        scale: [ 1, 1 ],
        position: [ 0, 0, 0 ]
      },

      text: {
        alpha: 1,
        position: [ textX, textY, 0 ],
        color: [ 255, 0, 255 ]
      },

      arrow: {
        alpha: 1,
        position: [ arrowX, arrowY, 0 ],
        arrowColor: opts.arrowEndColor      }
    }
  })
  .init('out');
};