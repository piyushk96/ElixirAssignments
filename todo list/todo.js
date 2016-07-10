var todoList=[];
window.onload=function()
{
  var receivedTodo=localStorage.getItem('ToDos');
  if(receivedTodo != null)
  {
    showTodos();
    for(i=0;i<todoList.length;i++)
    {
      if(todoList[i].done=='true')
      {
        strikeTodo(i);
      }
    }
  }
}

function addTodo()
{
  var newTodo=document.getElementById('inputText').value;
  todoList.push({task:newTodo , done:false});
  saveTodos();
  showTodos();
  document.getElementById('inputText').value=null;
}

function showTodos()
{
  var receivedTodo=localStorage.getItem('ToDos');
  todoList=JSON.parse(receivedTodo);
  var todosToShow='';
  for(i=0;i<todoList.length;i++)
  {
    if(todoList[i].done=='true')
    {
      todosToShow+='<li onclick="strikeTodo(id)" id="'+i+'"><input type="checkbox" checked>'+todoList[i].task+'</li>';
    }
    else
    {
      todosToShow+='<li onclick="strikeTodo(id)" id="'+i+'"><input type="checkbox">'+todoList[i].task+'</li>';
    }
  }
  document.getElementById('todosUL').innerHTML=todosToShow;
}

function saveTodos()
{
  var storeTodo=JSON.stringify(todoList);
  localStorage.setItem('ToDos',storeTodo);
}

function strikeTodo(Id)
{
  var el=document.getElementById(Id);
  el.style.textDecoration="line-through";
  el.innerHTML="<input type='checkbox' checked>"+todoList[Id].task;
  todoList[Id].done='true';
  saveTodos();
}

clearCompleted.onclick=function()
{
  var receivedTodo=localStorage.getItem('ToDos');
  todoList=JSON.parse(receivedTodo);
  for(i=0;i<todoList.length;i++)
  {
    if(todoList[i].done==='true')
    {
      todoList.splice(i,1);
      i--;
      saveTodos();
    }
  }
  showTodos();
}

clearAll.onclick=function()
{
  todoList.splice(0,todoList.length);
  saveTodos();
  showTodos();
}
