var arrowButton = require('./lib/arrowButton');
var addMoveAndFade = require('./lib/addMoveAndFade');

var container = document.body;

var width = 500;
var height = 30;

var ui = arrowButton( {
  width: 500,
  height: 30,

  arrowWidth: 20,
  arrowHeight: 20,

  textWidth: 80,
  textHeight: 18,

  targets: {
    bg1: getBG('#F00'),
    bg2: getBG('#0F0'),
    text: getText('Hello World'),
    arrow: getArrow()
  },

  parsers: require('f1-dom')
});

addMoveAndFade(ui.defStates, {
  from: 'out',
  to: 'idle'
});

ui.init('out');
ui.go('idle');


container.addEventListener('mouseover', function() {
  ui.go('rolled');
});

container.addEventListener('mouseout', function() {
  ui.go('idle');
});

container.addEventListener('click', function() {
  ui.go('out');
});


function getBG(color) {
  var el = document.createElement('div');

  el.style.backgroundColor = color;
  el.style.width = width + 'px';
  el.style.height = height + 'px';

  container.appendChild(el);

  return el;
}

function getArrow() {
  var el = document.createElement('div');

  el.style.backgroundColor = '#00CAFE';
  el.style.width = 20 + 'px';
  el.style.height = 20 + 'px';

  container.appendChild(el);

  return el;
}

function getText(copy) {
  var el = document.createElement('div');

  el.innerHTML = copy;

  container.appendChild(el);

  return el;
}