'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');
let toDoData = [];


const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  toDoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
    </div>`;

    // добавление  дел
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    // переключение выполненное/не выполненное
    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      localStorage.setItem('todo', JSON.stringify(toDoData));
      render();
    });
    // удаление
    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', function(){
      li.remove();
      console.log(toDoData);
    });
  });
};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if (headerInput.value === '') {
    return;
  }
  const newTodo = {
      value: headerInput.value,
      completed: false
  };
  toDoData.push(newTodo);
  headerInput.value = '';
  localStorage.setItem('todo', JSON.stringify(toDoData));
  render();
});
console.log(localStorage.getItem('todo'));
if (localStorage.getItem('todo') !== null){
  toDoData = JSON.parse(localStorage.getItem('todo'));
}
render();
