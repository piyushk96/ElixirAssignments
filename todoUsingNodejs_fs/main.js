var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var todos=[];

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/',function (req,res) {
    res.send('<h1><u>ToDo List</u></h1><br>'+
            '1. Add "/addtodos" to URL to add Todos<br><br>'+
            '2. Add "/fetchtodos" to URL to display Todos');
});

var html = '<h1><u>Add ToDo</u></h1>' +
    '<form method="post">' +
    '   <input autofocus type="text" name="task" size="80">' +
    '   <button type="submit">ADD</button>' +
    '</form>';

app.get('/addtodos',function (req,res) {
    res.send(html);
});

app.post('/addtodos',function (req,res) {
    if(req != null) {
        var dataString=fs.readFileSync('./myTodos.json');
        if(dataString != '') {
            todos = JSON.parse(dataString);
        }
        todos.push({task:req.body.task , done:'false'});
        var todosToStore = JSON.stringify(todos);
        fs.writeFile('./myTodos.json',todosToStore,function (err) {
            if(err) throw err;
        res.send(html+'<br>Todo added successfully!');
        });
    }
});

app.get('/fetchtodos',function (req,res) {
    var dataString=fs.readFileSync('./myTodos.json');
    var todosList='';
    if(dataString != '') {
        todos = JSON.parse(dataString);
        for (i of todos)
            todosList += '<li>' + i.task + '</li>';
        res.send('<h1><u>ToDos</u></h1><br>'+'<ol>' + todosList + '</ol>');
    }
    else
        res.send("No ToDos Added Yet!");
});

app.listen('5050',function () {
    console.log('server active at port 5050');
});