var arrowButton = require('./lib/arrowButton');

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

container.addEventListener('mouseover', function() {
  ui.go('rolled');
});

container.addEventListener('mouseout', function() {
  ui.go('idle');
});


function getBG(color) {
  var el = document.createElement('div');

  el.style.backgroundColor = color;
  el.style.width = 200 + 'px';
  el.style.height = 30 + 'px';

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