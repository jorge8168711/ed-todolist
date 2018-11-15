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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tasks =
/*#__PURE__*/
function () {
  function Tasks(key) {
    _classCallCheck(this, Tasks);

    this.key = key;
    this.tasksArray = [];
    this.subscriptions = [];

    if (!_helpers.ls.getItem(this.key)) {
      _helpers.ls.setItem(this.key, _helpers.j.stringify([]));
    } else {
      this.tasksArray = _helpers.j.parse(_helpers.ls.getItem(this.key));
    }
  }

  _createClass(Tasks, [{
    key: "updateLocalStorage",
    value: function updateLocalStorage() {
      _helpers.ls.setItem(this.key, _helpers.j.stringify(this.tasksArray));
    }
  }, {
    key: "add",
    value: function add(task) {
      this.tasksArray.push(task);
      this.updateLocalStorage();
      this.notify();
    }
  }, {
    key: "edit",
    value: function edit(task, newName) {
      this.tasksArray[task].name = newName;
      this.updateLocalStorage();
      this.notify();
    }
  }, {
    key: "complete",
    value: function complete(task, isComplete) {
      this.tasksArray[task].isComplete = isComplete;
      this.updateLocalStorage();
      this.notify();
    }
  }, {
    key: "delete",
    value: function _delete(task) {
      this.tasksArray.splice(task, 1);
      this.updateLocalStorage();
      this.notify();
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscriptions.push(callback);
    }
  }, {
    key: "notify",
    value: function notify() {
      var _this = this;

      this.subscriptions.forEach(function (sub) {
        sub(_this.tasksArray);
      });
    }
  }]);

  return Tasks;
}();

exports.default = Tasks;

},{"./helpers":4}],3:[function(require,module,exports){
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
  function ToDoList() {
    var _this = this;

    _classCallCheck(this, ToDoList);

    this.tasks = _index.tasks.tasksArray;
    this.addNewTask = this.addNewTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);

    _index.tasks.subscribe(function (tasks) {
      return _this.tasks = tasks;
    });

    _index.tasks.subscribe(function (tasks) {
      _this.renderNoTasksMessage(tasks);
    });

    window.addEventListener('load', function (e) {
      _this.initView(e);
    });
  }

  _createClass(ToDoList, [{
    key: "toggleErrorMessage",
    value: function toggleErrorMessage(itShow) {
      // TODO: mejorar con programación reactiva
      if (itShow) {
        _index.errorMessage.innerText = 'no se puede agregar una tarea vacía';

        _index.errorMessage.classList.add('is-visible');

        _index.taskInput.classList.add('has-error');
      } else {
        _index.errorMessage.classList.remove('is-visible');

        _index.taskInput.classList.remove('has-error'); // errorMessage.innerText = ''

      }
    }
  }, {
    key: "addNewTask",
    value: function addNewTask(e) {
      !e.target.value ? this.toggleErrorMessage(true) : this.toggleErrorMessage(false);

      if (e.keyCode === _helpers.ENTER_KEY && e.target.value) {
        var newTask = new _Task.default(e.target.value);

        _index.tasks.add(newTask);

        this.renderTask(newTask);
        e.target.value = '';
      }
    }
  }, {
    key: "editTask",
    value: function editTask(e) {
      if (e.target.localName === 'label' && e.target.className === 'list-item__label') {
        var taskToEdit = this.tasks.findIndex(function (task) {
          return task.id === Number(e.target.dataset.id);
        });

        var label = _helpers.d.querySelector(".list-item__label[data-id=\"".concat(this.tasks[taskToEdit].id, "\"]"));

        var saveTask = function saveTask(e) {
          // TODO: mejorar el modo en el que se dibujan los saltos de linea
          e.target.textContent = e.target.textContent;

          _index.tasks.edit(taskToEdit, e.target.textContent);

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
        var taskToRemove = this.tasks.findIndex(function (task) {
          return task.id === Number(e.target.dataset.id);
        });
        e.target.parentElement.addEventListener('animationend', function (e) {
          e.target.remove();
        });
        e.target.parentElement.removeAttribute('style');
        e.target.parentElement.classList.replace('entry-animation', 'exit-animation');

        _index.tasks.delete(taskToRemove);
      }
    }
  }, {
    key: "renderTask",
    value: function renderTask(task, index) {
      var _this2 = this;

      var taskTemplate = "\n      <li class=\"list-item entry-animation ".concat(task.isComplete ? 'was-completed' : '', "\"\n        style=\"animation-delay: ").concat(index + 1 ? (index + 1) * 120 : '0', "ms\"\n        data-id=\"").concat(task.id, "\">\n        <label for=\"").concat(task.id, "\" class=\"list-item__checkmark\"></label>\n        <input class=\"list-item__checkbox ").concat(task.isComplete ? 'was-completed' : '', "\"\n          type=\"checkbox\"\n          id=\"").concat(task.id, "\"\n          ").concat(task.isComplete ? 'checked' : '', ">\n\n        <label class=\"list-item__label\"\n          data-id=\"").concat(task.id, "\"\n          contenteditable\n          spellcheck>\n          ").concat(task.name, "\n        </label>\n\n        <p class=\"list-item__date\">").concat(task.creationDate, "</p>\n        <a class=\"list-item__remove-button\" href=\"#\" data-id=\"").concat(task.id, "\"></a>\n      </li>\n    ");

      _index.tasksList.insertAdjacentHTML('beforeend', taskTemplate);

      var taskCheckbox = _helpers.d.querySelector(".list-item[data-id=\"".concat(task.id, "\"] input[type=\"checkbox\"]"));

      taskCheckbox.addEventListener('change', function (e) {
        var taskToComplete = _this2.tasks.findIndex(function (task) {
          return task.id === Number(e.target.id);
        });

        if (e.target.checked) {
          taskCheckbox.parentElement.classList.add('was-completed');

          _index.tasks.complete(taskToComplete, true);
        } else {
          taskCheckbox.parentElement.classList.remove('was-completed');

          _index.tasks.complete(taskToComplete, false);
        }
      });
    }
  }, {
    key: "renderNoTasksMessage",
    value: function renderNoTasksMessage(tasks) {
      var template = "\n      <div class=\"no-tasks-message fade-in\">\n        your list is empty\n\n        <p class=\"credits\">\n          <a class=\"credits__link\"\n            href=\"https://www.uplabs.com/posts/empty-state-for-to-do-list-app\"\n            target=\"_blank\">image\n          </a>\n\n          by\n\n          <a class=\"credits__link\" href=\"https://www.uplabs.com/prdvicky\"\n            target=\"_blank\">\n            Vicky Ardi\n          </a>\n        </p>\n      </div>\n    ";

      if (tasks.length === 0) {
        _helpers.d.querySelector('.todo-list-title').classList.toggle('hidden');

        _helpers.d.querySelector('main.todo').insertAdjacentHTML('beforeend', template);
      } else if (_helpers.d.querySelector('.no-tasks-message') && tasks.length > 0) {
        _helpers.d.querySelector('.no-tasks-message').classList.replace('fade-in', 'fade-out');

        _helpers.d.querySelector('.no-tasks-message').addEventListener('animationend', function () {
          _helpers.d.querySelector('.no-tasks-message').remove();

          _helpers.d.querySelector('.todo-list-title').classList.toggle('hidden');
        });
      }
    }
  }, {
    key: "initView",
    value: function initView(e) {
      var _this3 = this;

      if (this.tasks.length > 0) {
        this.tasks.forEach(function (task, index) {
          return _this3.renderTask(task, index);
        });
      } else {
        this.renderNoTasksMessage(this.tasks);
      }
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;

},{"./Task":1,"./helpers":4,"./index.js":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoList = exports.tasks = exports.errorMessage = exports.tasksList = exports.taskInput = void 0;

var _helpers = require("./helpers");

var _ToDoList = _interopRequireDefault(require("./ToDoList"));

var _Tasks = _interopRequireDefault(require("./Tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DOM ELEMENTS
var taskInput = _helpers.d.querySelector('#taskInput');

exports.taskInput = taskInput;

var tasksList = _helpers.d.querySelector('#todoList');

exports.tasksList = tasksList;

var errorMessage = _helpers.d.querySelector('#errorMessage');

exports.errorMessage = errorMessage;
var tasks = new _Tasks.default('NiceTodoList');
exports.tasks = tasks;
var todoList = new _ToDoList.default(); // task input listeners

exports.todoList = todoList;
taskInput.addEventListener('keyup', function (e) {
  todoList.addNewTask(e);
});
taskInput.addEventListener('blur', function () {
  todoList.toggleErrorMessage(false);
}); // task-list listeners

tasksList.addEventListener('click', function (e) {
  todoList.editTask(e);
});
tasksList.addEventListener('click', function (e) {
  todoList.removeTask(e);
});

},{"./Tasks":2,"./ToDoList":3,"./helpers":4}]},{},[5]);
