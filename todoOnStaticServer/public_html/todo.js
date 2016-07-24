/**
 * Created by piyush on 21/7/16.
 */
$(document).ready(function () {
    $.get('/reload',function (data,status) {
        $("#todosUL").empty();
        for(todo of data)
        {
            $("#todosUL").append('<li><input type="checkbox">'+todo.task+'</li>');
            if(data.done==true)
            {
                var el=$("todosUL li").last();
                el.css("text-decoration","line-through");
                el.children().attr("checked","true");
            }
        }
    });
});
$("#addTodo").click(function () {
    var task=$("#inputText").val();
    if(task != '')
    {
        $.get('/addtodo?task=' + task, function (data, status) {
            $("#todosUL").append("<li><input type='checkbox'>" + data[data.length - 1].task + "</li>");
            console.log("todo added successfully");
        });
    }
    $("#inputText").val('');
});
$("#todosUL").on('click','li',function () {
    var el=$(this);
    $.get('/donetodo?id='+el.index(),function (data,status) {
        el.css("text-decoration","line-through");
        el.children().attr("checked","true");
    });
});
$("#clearCompleted").click(function () {
    $.get('/clearcompleted',function (data,status) {
        $("#todosUL").empty();
        for(todo of data)
            $("#todosUL").append('<li><input type="checkbox">'+todo.task+'</li>');
    });
});
$("#clearAll").click(function () {
    $.get('/clearall',function (data,status) {
        $('#todosUL').empty();
    });
});