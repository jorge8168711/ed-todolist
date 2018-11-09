(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = division;
exports.modulo = modulo;

function division(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

},{}],2:[function(require,module,exports){
"use strict";

var _suma = require("./suma");

var _resta = require("./resta");

var _division = _interopRequireWildcard(require("./division"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * IMPORTS
 * solo se pude tener una exportación por default en cada archivo
 *
 * ejemplo 1
 * import division from 'division'
 * cuando se importa de este modo quiere decir que la función que se exporta
 * por default es "division", para eso se coloca default despues la palabra
 * export
 *
 * ejemplo 2
 * import division, {module} from 'division'
 * en este caso se importa a "division" que esta declarado como default y a
 * "module" que no esta declarada como default entre los brackets usando
 * desestructuración
 */
var c = console.log;
c((0, _suma.suma)(10, 20));
c((0, _resta.resta)(40, 30));
c((0, _division.default)(100, 5));
c((0, _division.modulo)(100, 2));

},{"./division":1,"./resta":3,"./suma":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resta = resta;

function resta(a, b) {
  return a - b;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suma = suma;

function suma(a, b) {
  return a + b;
}

},{}]},{},[2]);
