module.exports = function getStatesToApplyTo(opts, func) {

  var getUIStates = function(uiName) {
    var uiStates = {};

    for(var stateName in opts.states) {
      
      uiStates[ stateName ] = {};
      uiStates[ stateName ][ uiName ] = opts.states[ stateName ][ uiName ];
    }

    return uiStates;
  };

  if(opts.ui) {
    if(Array.isArray(opts.ui)) {
      opts.ui.forEach(function(uiName) {
        if(typeof uiName === 'string') {
          func(getUIStates(uiName));  
        } else {
          throwUITypeError();
        }
      });
    } else if(typeof opts.ui === 'string') {
      func(getUIStates(opts.ui));
    } else {
      throwUITypeError();
    }
  } else {
    func(opts.states);
  }
}

function throwUITypeError() {
  throw new Error('opts.ui must be a string or an Array of Strings');
}