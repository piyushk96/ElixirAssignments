/**
 * Created by piyush on 25/7/16.
 */
'use strict';
var pokemonSelected = 'pikachu.png';
var playerName;

$("#newGame").click(function () {
    $("#content").hide();
    $("#userDetail").show();
});

$("#instruct").click(function () {
    $("#content").hide();
    $("#instructions").show();
});

$(".back").click(function () {
    $("#instructions").hide();
    $('#userDetail').hide();
    $('#leaderBoard').hide();
    $("#content").show();
});

$("li").click(function () {
    var el = $(this);
    el.css('background-color','deepskyblue');
    var temp = ( el.children() )[0].src.split('/');
    pokemonSelected = temp[temp.length - 1];
});

$("#playGame").click(function () {
    playerName = $("#playerName").val();
    if( playerName == '' )
    {
        $("#playerName").attr("placeholder","Enter Name").css("border","4px solid red");
        setTimeout(function () {
            $('#playerName').attr("placeholder","").css("border","2px solid black");
        },1000);
    }
    else{
        var playerObj = {
            name : playerName,
            score : 0
        };
        $.post('/addplayer',playerObj,function (data,status) {
            playerObj.pokemon = pokemonSelected;
            playerObj.id = data.insertId;
            playerObj.level = 1;

            window.location.href = "game.html";

            const playerString = JSON.stringify(playerObj);
            localStorage.setItem('player',playerString);
        });
    }
});

$('#ShowLeaderBoard').click(function () {
    $('#content').hide();
    $('#leaderBoard').show();
    $.get('/leaderboard',function (data,status) {
        console.log(data);
        for(var i=0;i<10;i++)
        {
            $('#leaderBoard table').append(
                '<tr>' +
                    '<td id="rank">'+ (i+1) + '</td>' +
                    '<td>' + data[i].name +'</td>' +
                    '<td id="tableScore">' + data[i].score + '</td>' +
                '</tr>'
            );
        }
    });
});