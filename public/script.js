!function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Task=function Task(name){return _classCallCheck(this,Task),this.date=new Date,this.id=this.date.getTime(),this.name=name,this.isComplete=!1,this.creationDate="".concat(this.date.getDay(),"/").concat(this.date.getMonth(),"/").concat(this.date.getUTCFullYear()),this};exports.default=Task},{}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _helpers=require("./helpers"),_index=require("./index.js"),_Task=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(require("./Task")),ToDoList=function(){function ToDoList(key){_classCallCheck(this,ToDoList),this.key=key,this.tasksList=_index.list.children,_helpers.ls.getItem(key)||_helpers.ls.setItem(key,_helpers.j.stringify([])),this.addTask=this.addTask.bind(this),this.editTask=this.editTask.bind(this),this.removeTask=this.removeTask.bind(this)}return _createClass(ToDoList,[{key:"getTasks",value:function(key){return(0,_helpers.c)(_helpers.j.parse(_helpers.ls.getItem(key))),_helpers.j.parse(_helpers.ls.getItem(key))}},{key:"updateTasks",value:function(updatedTasks){_helpers.ls.setItem(this.key,_helpers.j.stringify(updatedTasks)),(0,_helpers.c)(updatedTasks)}},{key:"toggleErrorMessage",value:function(itShow){itShow?(_index.errorMessage.innerText="no se puede agregar una tarea vacía",_index.errorMessage.classList.add("is-visible"),_index.task.classList.add("has-error")):(_index.errorMessage.classList.remove("is-visible"),_index.task.classList.remove("has-error"),_index.errorMessage.innerText="")}},{key:"addTask",value:function(e){if(e.target.value?this.toggleErrorMessage(!1):this.toggleErrorMessage(!0),e.keyCode===_helpers.ENTER_KEY&&e.target.value){var newTask=new _Task.default(e.target.value),tasks=this.getTasks(this.key);tasks.push(newTask),this.updateTasks(tasks),this.renderTask(newTask),e.target.value="",this.addListenerForTasksInput(tasks)}}},{key:"editTask",value:function(e){var _this=this;if("label"===e.target.localName&&"list-item__label"===e.target.className){var tasks=this.getTasks(this.key),taskToEdit=tasks.findIndex(function(task){return task.id===Number(e.target.dataset.id)}),label=_helpers.d.querySelector('[data-id="'.concat(tasks[taskToEdit].id,'"]')),saveTask=function(e){e.target.textContent=e.target.textContent,tasks[taskToEdit].name=e.target.textContent,_this.updateTasks(tasks),e.target.blur()};label.addEventListener("blur",function(e){return saveTask(e)}),label.addEventListener("keyup",function(e){return e.keyCode===_helpers.ENTER_KEY&&saveTask(e)})}}},{key:"removeTask",value:function(e){if("a"===e.target.localName){e.preventDefault();var tasks=this.getTasks(this.key),taskToRemove=tasks.findIndex(function(task){return task.id===Number(e.target.dataset.id)});tasks.splice(taskToRemove,1),this.updateTasks(tasks),e.target.parentElement.addEventListener("animationend",function(e){e.target.remove()}),e.target.parentElement.removeAttribute("style"),e.target.parentElement.classList.replace("entry-animation","exit-animation")}}},{key:"renderTask",value:function(task,index){var taskTemplate='\n    <li class="list-item entry-animation '.concat(task.isComplete?"was-completed":"",'"\n      style="animation-delay: ').concat(index+1?120*(index+1):"0",'ms">\n      <label for="').concat(task.id,'" class="list-item__checkmark"></label>\n      <input class="list-item__checkbox ').concat(task.isComplete?"was-completed":"",'"\n        type="checkbox"\n        id="').concat(task.id,'"\n        ').concat(task.isComplete?"checked":"",'>\n\n      <label class="list-item__label"\n        data-id="').concat(task.id,'"\n        contenteditable\n        spellcheck>\n        ').concat(task.name,'\n      </label>\n\n      <p class="list-item__date">').concat(task.creationDate,'</p>\n      <a class="list-item__remove-button" href="#" data-id="').concat(task.id,'"></a>\n    </li>\n    ');_index.list.insertAdjacentHTML("beforeend",taskTemplate)}},{key:"addListenerForTasksInput",value:function(tasksArray){var _this2=this;Array.from(this.tasksList).forEach(function(listItem){listItem.querySelector('input[type="checkbox"]').addEventListener("change",function(e){var task=tasksArray.filter(function(task){return task.id===Number(e.target.id)});e.target.checked?(e.target.parentElement.classList.add("was-completed"),task[0].isComplete=!0):(e.target.parentElement.classList.remove("was-completed"),task[0].isComplete=!1),_this2.updateTasks(tasksArray)})})}},{key:"render",value:function(){var _this3=this,tasks=this.getTasks(this.key);tasks.forEach(function(task,index){return _this3.renderTask(task,index)}),this.addListenerForTasksInput(tasks),_index.task.addEventListener("keyup",this.addTask),_index.task.addEventListener("blur",function(){_this3.toggleErrorMessage(!1)}),_index.list.addEventListener("click",this.editTask),_index.list.addEventListener("click",this.removeTask)}}]),ToDoList}();exports.default=ToDoList},{"./Task":1,"./helpers":3,"./index.js":4}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ls=exports.j=exports.d=exports.c=exports.ENTER_KEY=void 0;exports.ENTER_KEY=13;var c=console.log;exports.c=c;var d=document;exports.d=d;var j=JSON;exports.j=j;var ls=localStorage;exports.ls=ls},{}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.content=exports.errorMessage=exports.list=exports.task=void 0;var _helpers=require("./helpers"),_ToDoList=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(require("./ToDoList")),task=_helpers.d.querySelector("#taskInput");exports.task=task;var list=_helpers.d.querySelector("#todoList");exports.list=list;var errorMessage=_helpers.d.querySelector("#errorMessage");exports.errorMessage=errorMessage;var content=_helpers.d.querySelector("#content");exports.content=content;var todo=new _ToDoList.default("NiceTodoList");window.addEventListener("DOMContentLoaded",function(e){todo.render()})},{"./ToDoList":2,"./helpers":3}]},{},[4]);