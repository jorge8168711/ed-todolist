(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
  _classCallCheck(this, Task);

  this.date = new Date();
  this.id = this.date.getTime();
  this.name = name;
  this.isComplete = false;
  this.creationDate = "".concat(this.date.getDay(), "/").concat(this.date.getMonth(), "/").concat(this.date.getUTCFullYear()); // se retorna el objecto generado por el el metodo constructror
  // con esto permitimos que se pueda guardar este objeto en localStorage

  return this;
};

exports.default = Task;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _index = require("./index.js");

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToDoList =
/*#__PURE__*/
function () {
  function ToDoList(key) {
    _classCallCheck(this, ToDoList);

    this.key = key;

    if (!_helpers.ls.getItem(key)) {
      _helpers.ls.setItem(key, _helpers.j.stringify([]));
    }

    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  _createClass(ToDoList, [{
    key: "getTasks",
    value: function getTasks(key) {
      (0, _helpers.c)(_helpers.j.parse(_helpers.ls.getItem(key)));
      return _helpers.j.parse(_helpers.ls.getItem(key));
    }
  }, {
    key: "updateTasks",
    value: function updateTasks(updatedTasks) {
      _helpers.ls.setItem(this.key, _helpers.j.stringify(updatedTasks));

      (0, _helpers.c)(updatedTasks);
    }
  }, {
    key: "toggleErrorMessage",
    value: function toggleErrorMessage(itShow) {
      if (itShow) {
        _index.errorMessage.innerText = 'no se puede agregar una tarea vacía';

        _index.errorMessage.classList.add('is-visible');

        _index.task.classList.add('has-error');
      } else {
        _index.errorMessage.classList.remove('is-visible');

        _index.task.classList.remove('has-error');

        _index.errorMessage.innerText = '';
      }
    }
  }, {
    key: "addTask",
    value: function addTask(e) {
      !e.target.value ? this.toggleErrorMessage(true) : this.toggleErrorMessage(false);

      if (e.keyCode === _helpers.ENTER_KEY && e.target.value) {
        var newTask = new _Task.default(e.target.value);
        var tasks = this.getTasks(this.key);
        tasks.push(newTask);
        this.updateTasks(tasks);
        this.renderTask(newTask);
        e.target.value = '';
      }
    }
  }, {
    key: "editTask",
    value: function editTask(e) {
      var _this = this;

      if (e.target.localName === 'label') {
        var tasks = this.getTasks(this.key);
        var taskToEdit = tasks.findIndex(function (task) {
          return task.id === Number(e.target.dataset.id);
        });

        var label = _helpers.d.querySelector("[data-id=\"".concat(tasks[taskToEdit].id, "\"]"));

        var saveTask = function saveTask(e) {
          e.target.textContent = e.target.textContent;
          tasks[taskToEdit].name = e.target.textContent;

          _this.updateTasks(tasks);

          e.target.blur();
        };

        label.addEventListener('blur', function (e) {
          return saveTask(e);
        });
        label.addEventListener('keyup', function (e) {
          return e.keyCode === _helpers.ENTER_KEY && saveTask(e);
        });
      }
    }
  }, {
    key: "removeTask",
    value: function removeTask(e) {
      if (e.target.localName === 'a') {
        e.preventDefault();
        var tasks = this.getTasks(this.key);
        var taskToRemove = tasks.findIndex(function (task) {
          return task.id === Number(e.target.dataset.id);
        });
        tasks.splice(taskToRemove, 1);
        this.updateTasks(tasks);
        e.target.parentElement.remove();
      }
    }
  }, {
    key: "renderTask",
    value: function renderTask(task, index) {
      var taskTemplate = "\n    <li class=\"list-item entry-animation ".concat(task.isComplete ? 'was-completed' : '', "\"\n      style=\"animation-delay: ").concat((index + 1) * 120, "ms\">\n      <label for=\"").concat(task.id, "\" class=\"list-item__checkmark\"></label>\n      <input class=\"list-item__checkbox ").concat(task.isComplete ? 'was-completed' : '', "\"\n        type=\"checkbox\"\n        id=\"").concat(task.id, "\"\n        ").concat(task.isComplete ? 'checked' : '', ">\n\n      <label class=\"list-item__label\"\n        data-id=\"").concat(task.id, "\"\n        contenteditable\n        spellcheck>\n        ").concat(task.name, "\n      </label>\n\n      <p class=\"list-item__date\">").concat(task.creationDate, "</p>\n      <a class=\"list-item__remove-button\" href=\"#\" data-id=\"").concat(task.id, "\"></a>\n    </li>\n    ");

      _index.list.insertAdjacentHTML('beforeend', taskTemplate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tasks = this.getTasks(this.key);
      var listTasks = _index.list.children; // render tasks list

      tasks.forEach(function (task, index) {
        return _this2.renderTask(task, index);
      }); // https://developer.mozilla.org/es/docs/Web/API/HTMLCollection
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/from
      // las listas de nodos se comportan como arreglos pero no son arreglos
      // por lo tanto los métodos de los arreglos no funcionan con estos
      // creamos un array a partir de una lista de nodos(HTMLCollection)

      Array.from(listTasks).forEach(function (listItem) {
        listItem.querySelector('input[type="checkbox"]').addEventListener('change', function (e) {
          var task = tasks.filter(function (task) {
            return task.id === Number(e.target.id);
          });

          if (e.target.checked) {
            e.target.parentElement.classList.add('was-completed');
            task[0].isComplete = true;
          } else {
            e.target.parentElement.classList.remove('was-completed');
            task[0].isComplete = false;
          }

          _this2.updateTasks(tasks);
        });
      });

      _index.task.addEventListener('keyup', this.addTask);

      _index.task.addEventListener('blur', function () {
        _this2.toggleErrorMessage(false);
      });

      _index.list.addEventListener('click', this.editTask);

      _index.list.addEventListener('click', this.removeTask);
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;

},{"./Task":1,"./helpers":3,"./index.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ls = exports.j = exports.d = exports.c = exports.ENTER_KEY = void 0;
var ENTER_KEY = 13;
exports.ENTER_KEY = ENTER_KEY;
var c = console.log;
exports.c = c;
var d = document;
exports.d = d;
var j = JSON;
exports.j = j;
var ls = localStorage;
exports.ls = ls;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.content = exports.errorMessage = exports.list = exports.task = void 0;

var _helpers = require("./helpers");

var _ToDoList = _interopRequireDefault(require("./ToDoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = _helpers.d.querySelector('#taskInput');

exports.task = task;

var list = _helpers.d.querySelector('#todoList');

exports.list = list;

var errorMessage = _helpers.d.querySelector('#errorMessage');

exports.errorMessage = errorMessage;

var content = _helpers.d.querySelector('#content');

exports.content = content;
var todo = new _ToDoList.default('NiceTodoList');
window.addEventListener('DOMContentLoaded', function (e) {
  todo.render();
});

},{"./ToDoList":2,"./helpers":3}]},{},[4]);
