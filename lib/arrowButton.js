var f1 = require('f1');

module.exports = function(opts) {

  opts.width = opts.width || 200;
  opts.arrowWidth = opts.arrowWidth || 20;
  opts.arrowHeight = opts.arrowHeight || 20;
  opts.textWidth = opts.textWidth || 200;

  var arrowX = opts.width - 10 - opts.arrowWidth;
  var arrowY = ( opts.height - opts.arrowHeight ) * 0.5;
  var textX = ( arrowX - opts.textWidth ) * 0.5;
  var textY = ( opts.height - opts.textHeight ) * 0.5;

  var states = {};

  return f1(opts)
  .transitions([
    { from: 'idle', to: 'rolled' },
    { from: 'rolled', to: 'idle' },
    { from: 'out', to: 'idle' },
    { from: 'idle', to: 'out' }
  ])
  .states( {
    out: {
      bg1: {
        alpha: 0,
        position: [ 0, 20, 0 ]
      },

      bg2: {
        alpha: 0,
        anchor: [ 1, 0 ],
        scale: [ 0, 1 ],
        position: [ 0, 20, 0 ]
      },

      text: {
        alpha: 0,
        position: [ textX, textY + 20, 0 ],
        color: [ 255, 255, 255 ]
      },

      arrow: {
        alpha: 0,
        position: [ arrowX, arrowY + 20, 0 ]
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
        position: [ arrowX, arrowY, 0 ]
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
        position: [ arrowX, arrowY, 0 ]
      }
    }
  })
  .init('out');
};