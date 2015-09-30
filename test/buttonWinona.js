var buttonWinona = require('../buttonWinona');
var f1 = require('f1');
var f1Dom = require('f1-dom');

var container = document.body;
var width = 200;
var height = 60;

var ui = f1(buttonWinona( {
  width: width,
  height: height,

  targets: {
    text1: getText('#F00', 'Hello'),
    text2: getText('#0F0', 'World')
  },
  parsers: f1Dom
}));

ui.init('idle');

container.addEventListener('mouseover', function() {
  ui.go('rolled');
});

container.addEventListener('mouseout', function() {
  ui.go('idle');
});

function getText(color, copy) {
  var el = document.createElement('div');

  el.style.width = width + 'px';
  el.style.height = height + 'px';
  el.style.fontSize = '12px';
  el.style.padding = (height - 12) * 0.5 + 'px';
  el.innerHTML = copy;

  container.appendChild(el);

  return el;
}