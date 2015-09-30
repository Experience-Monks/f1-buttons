module.exports = function(applyTo, states, uiName, func) {

  if(typeof uiName === 'function') {
    func = uiName;
    uiName = undefined;
  }

  if(Array.isArray(applyTo)) {
    applyTo.forEach(function(stateName) {
      apply(states[ stateName ], func, uiName);
    });
  } else {
    apply(states[ applyTo ], func, uiName);
  }
};

function apply(state, func, uiName) {
  if(uiName) {
    func(state[ uiName ]);  
  } else {
    for(var uiName in state) {
      func(state[ uiName ]);
    }
  }
}