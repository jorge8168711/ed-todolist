"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8080;
var app = (0, _express.default)();
app.set('port', port).use(_express.default.static('public'));

var server = _http.default.createServer(app);

server.listen(app.get('port'), function () {
  return console.log("Iniciando Aplicaci\xF3n Isom\xF3rfica JavaScript en el puerto ".concat(app.get('port')));
});