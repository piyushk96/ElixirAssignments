/**
 * Created by piyush on 21/7/16.
 */
var express=require('express');
var app=express();
var todoList=[];

app.use('/',express.static('./public_html'));

app.get('/reload',function (req,res) {
    res.send(todoList);
});

app.get('/addtodo',function (req,res) {
     if(req != null)
     {
         todoList.push({task:req.query.task,done:false});
         res.send(todoList);
     }
});

app.get('/donetodo',function (req,res) {
    todoList[req.query.id].done=true;
    res.send();
});

app.get('/clearcompleted',function (req,res) {
    for(i=0;i<todoList.length;i++)
    {
        if(todoList[i].done==true)
        {
            todoList.splice(i,1);
            i--;
        }
    }
    res.send(todoList);
});

app.get('/clearall',function (req,res) {
    todoList.splice(0,todoList.length);
    res.send();
});

app.listen('5000',function () {
    console.log('Server started at port: 5000');
});