module.exports = function addFadeAndMove(states, opts) {

  if(!opts.from) {
    throw new Error('opts.from state must be defined');
  }

  if(!opts.to) {
    throw new Error('opts.to state must be defined');
  }

  var from = opts.from;
  var to = opts.to;

  opts.moveAmount = opts.moveAmount === undefined ? 20 : opts.moveAmount;
  opts.alphaIn = opts.alphaIn === undefined ? 1 : opts.alphaIn;
  opts.alphaOut = opts.alphaOut === undefined ? 0 : opts.alphaOut;

  for(var uiName in states[ from ]) {

    // add in position if they don't exist
    if(!states[ from ][ uiName ].position) {
      states[ from ][ uiName ].position = [0, 0, 0];
    }

    if(!states[ to ][ uiName ].position) {
      states[ to ][ uiName ].position = [0, 0, 0];
    }

    // move the from states position down by 20 px
    states[ from ][ uiName ].position[ 1 ] += opts.moveAmount; 
    states[ from ][ uiName ].alpha = opts.alphaOut;

    states[ to ][ uiName ].alpha = opts.alphaIn;
  }
}