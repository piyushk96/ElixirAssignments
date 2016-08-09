/**
 * Created by piyush on 25/7/16.
 */
var score;
var playerObj = {};
var level;


//////FETCHING PLAYER DETAILS//////
var playerStr = localStorage.getItem('player');
if(playerStr == null)
    window.location.href = "/";
else
{
    playerObj = JSON.parse(playerStr);
    score = playerObj.score;
    level = playerObj.level;
}

var canvas=document.getElementById('gameCanvas');
var ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var GAME_WIDTH = canvas.width;
var GAME_HEIGHT= canvas.height;

var gameOver=false;

var sprites = {};
sprites.player =new Image();
sprites.player.src= 'images/'+playerObj.pokemon;
sprites.ball =new Image();
sprites.ball.src= 'images/ball.png';
sprites.enemy = [];

function setEnemy()
{
     for(let i=0;i<5;i++){
        $('#gameCanvas').css({
            "background": "url('images/level"+level+"/background.png') no-repeat",
            "background-size": "cover"
        });
        sprites.enemy[i]=new Image();
        sprites.enemy[i].src= 'images/level'+level+'/poke'+(i+1)+'.png';
     }
}
setEnemy();     //initial Enemy setting

var enemy =[
    {
        x: 0.15*GAME_WIDTH,
        y: 50,
        w: 70,
        h: 70,
        speedY:3,
        downMove: true,
        scored: false
    },
    {
        x: 0.3*GAME_WIDTH,
        y: 0,
        w: 70,
        h: 70,
        speedY:4,
        downMove: true,
        scored: false
    },
    {
        x: 0.45*GAME_WIDTH,
        y: 50,
        w: 70,
        h: 70,
        speedY:5,
        downMove: true,
        scored: false
    },
    {
        x: 0.6*GAME_WIDTH,
        y: 100,
        w: 70,
        h: 70,
        speedY:6,
        downMove: true,
        scored: false
    },
    {
        x: 0.75*GAME_WIDTH,
        y: 50,
        w: 70,
        h: 70,
        speedY:7,
        downMove: true,
        scored: false
    }
];

var player = {
    x: 10,
    y: GAME_HEIGHT / 2,
    w: 70,
    h: 70,
    speedX: 4*level,
    isMoving: false,
    leftMove: false
};

var ball = {
    x:GAME_WIDTH-80,
    y:GAME_HEIGHT/2,
    w:70,
    h:70,
};

var temp = level;
while(temp>1)     ///refreshing speed on reloading
{
    for(var i=0; i<enemy.length; i++)
        enemy[i].speedY += temp;
    temp--;
}

$('#score').html("SCORE <br><span>"+score+"</span>");

$('#playAgain').on('touchstart click', function () {
    window.location.href = '/';
});

$('#nextLevel').on('touchstart click', function () {
    $('#alertBox').hide();
    $('#score').show();
    level++;
    playerObj.level = level;
    setEnemy();
    player.x=10;
    player.speedX += 4;
    enemy.forEach(function (element,index) {    //speed increase
        element.speedY += level;
        element.scored = false;
    });
    gameOver = false;
    var playerStr = JSON.stringify(playerObj);
    localStorage.setItem('player',playerStr);
    render();
});

canvas.addEventListener("touchstart",function () {
    player.isMoving = true;
});
canvas.addEventListener("touchend",function () {
    player.isMoving = false;
});
window.addEventListener("keydown",function(key){
    if(key.keyCode == 39)
        player.isMoving = true;
    else if(key.keyCode == 37){
        player.leftMove = true;
        player.isMoving = true;
    }
});
window.addEventListener("keyup",function(key){
    if(key.keyCode == 39)
        player.isMoving = false;
    else if(key.keyCode == 37){
        player.leftMove = false;
        player.isMoving = false;
    }
});

function isColliding(r1,r2) {
    var firstCond = Math.abs(r1.x-r2.x)<=Math.max(r1.w,r2.w)-10;
    var secondCond = Math.abs(r1.y-r2.y)<=Math.max(r1.h,r2.h)-10;
    if(firstCond && secondCond)
    {
        playerObj.score = score;
        $.post('/updatescore',playerObj,function (data,status) {});
        $('#score').hide();
        $('#alertBox').show();
        $('#playerName').html(playerObj.name);
        $('#playerScore').html('Score: ' + playerObj.score);
        gameOver = true;
        return true;
    }
    else
        return false;
}

function update()
{
    //check for collision between enemy and player
    enemy.forEach(function (element,index)
    {
        if(isColliding(player,element))
        {
            $('#nextLevel').hide();
            $('#playAgain').css('display','inline-block');
            $('#achievement').html('Game Over!');
            player.x=10;
            player.isMoving = false;
            localStorage.setItem('player','');
        }
    });

    //check collision between player and ball
    if(isColliding(player,ball))
    {
        if(level == 5) {
            $('#achievement').html('You Won!');
            $('#nextLevel').hide();
            level=1;
        }
        else {
            $('#achievement').html("Level " + level + " cleared!");
            player.isMoving = false;
        }
    }

    //Moving Enemies
    enemy.forEach(function (element,index)
    {
        if(element.downMove == true)
            element.y += element.speedY;
        else
            element.y -= element.speedY;

        if(element.y >= GAME_HEIGHT-70)
            element.downMove = false;
        else if(element.y <= 0)
            element.downMove = true;
    });

    if(player.isMoving)
    {
        if(player.leftMove == false)            //moving forward
        {
            player.x += player.speedX;
            ///updating Score///
            for( var i=0;i<enemy.length;i++)
            {
                if( player.x > enemy[i].x+enemy[i].w && enemy[i].scored == false){
                    score += 10*(i+1)*level;
                    enemy[i].scored = true;
                }
            }
            $('#score').html("SCORE <br><span>"+score+"</span>");
        }
        else if(player.leftMove == true && player.x > 10)
            player.x -= player.speedX;

        playerObj.player = player;
        var playerStr = JSON.stringify(playerObj);
        localStorage.setItem('player', playerStr);
    }
}

function draw()
{
    //clear the screen
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    //draw Enemies
    enemy.forEach(function (element, index) {
        ctx.drawImage(sprites.enemy[index],element.x,element.y,element.w,element.h);
    });

    //Draw Player
    ctx.drawImage(sprites.player,player.x,player.y,player.w,player.h);

    //Draw  Ball
    ctx.drawImage(sprites.ball,ball.x,ball.y,ball.w,ball.h);
}

function render(){
    draw();
    update();
    if(gameOver == false)
        window.requestAnimationFrame(render);
}
render();
