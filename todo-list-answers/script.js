	'use strict';

var MyApp = {};

MyApp.todos = [
  {toDo:"Clean Fridge"},
  {toDo:"Burn Fridge because cleaning was unsuccessful"},
  {toDo:"Buy new fridge"},
  {toDo:"Buy food"}
];

MyApp.compileItem = function(item){
  var source = $('#todo-template').html();
  var template =  Handlebars.compile(source);
  return template(item);
}

MyApp.addToList = function(list,item){
  var itemObject = {toDo:item.val()};
  MyApp.todos.push(itemObject);
  var compiledItem = MyApp.compileItem(itemObject);
  list.append(compiledItem);
}

MyApp.populateList = function(list){
  for(var i=0;i<MyApp.todos.length;i++){
    var newItem = MyApp.compileItem(MyApp.todos[i]);
    list.append(newItem);
  }
}
// Remove both the data from the model/array and from the DOM
MyApp.removeFromList = function($list, $item) {
  console.log($item);
  var itemIndex = $item.index();
  if (itemIndex > -1) {
    MyApp.todos.splice(itemIndex, 1);
  }
  $item.remove();
}

$(document).ready(function(){
  var $newTaskForm = $('#new_task');
  var $taskList = $('#task_list');

  MyApp.populateList($taskList);

  $newTaskForm.submit(function(event){
    event.preventDefault();
    var $newTaskInput = $('#new_task_input');
    MyApp.addToList($taskList,$newTaskInput);
  });

  $taskList.on('click', '.delete', function(e) {
    e.preventDefault();
    var $listItem = $(this).parent();
    MyApp.removeFromList($taskList, $listItem);
  });


  $taskList.on('click', '.complete', function(e) {
    e.preventDefault();
    var listItem = $(this).parent();
    listItem.toggleClass('completed');
  });


});

