module.exports = function(opts) {
  if(!opts.from) {
    throw new Error('opts.from state must be defined');
  }

  if(!opts.to) {
    throw new Error('opts.to state must be defined');
  }
};