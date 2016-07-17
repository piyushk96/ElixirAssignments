todoList=[];
$(document).ready(function(){
  var receivedTodo=localStorage.getItem('ToDos');
  if(receivedTodo != null)
  {
    todoList=JSON.parse(receivedTodo);
    showTodos();
  }
});

$("#addTodo").click(function(){
  var newTodo = $("#inputText").val();
  todoList.push({task:newTodo , done:false});
  $("#todosUL").append("<li><input type='checkbox'>"+newTodo+"</li>");
  saveTodos();
  $("#inputText").val('');
});

function showTodos()
{
  for(i=0;i<todoList.length;i++)
  {
    $("#todosUL").append("<li><input type='checkbox'>"+todoList[i].task+"</li>");
    if(todoList[i].done=='true')
    {
      $("#todosUL li").last().css("text-decoration","line-through");
      $("#todosUL li").last().children().attr("checked","true");
    }
  }
}

function saveTodos()
{
  var storeTodo=JSON.stringify(todoList);
  localStorage.setItem('ToDos',storeTodo);
}

$("#todosUL").on('click','li',function(){
  var el= $(this);
  el.css("text-decoration","line-through");
  el.children().attr("checked","true");
  todoList[el.index()].done='true';
  saveTodos();
});

$("#clearCompleted").click(function(){
  var receivedTodo=localStorage.getItem('ToDos');
  todoList=JSON.parse(receivedTodo);
  for(i=0;i<todoList.length;i++)
  {
    if(todoList[i].done==='true')
    {
      todoList.splice(i,1);
      $("#todosUL li").eq(i).remove();
      saveTodos();
      i--;
    }
  }
});

$("#clearAll").click(function(){
  todoList.splice(0,todoList.length);
  saveTodos();
  $("#todosUL").empty();
});
