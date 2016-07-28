/**
 * Created by piyush on 25/7/16.
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const dbhandler = require('./dbhandler');

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname+'/public_html'));

app.post('/addplayer',function (req,res) {
    const player = {
        name : req.body.name,
        score : req.body.score
    } ;
    dbhandler.addPlayer(player , function (result) {
        res.send(result);
    });
});

app.post('/updatescore',function (req,res) {
    const player = {
        id: req.body.id,
        score : req.body.score
    } ;
    dbhandler.updateScore(player, function (result) {
        res.send(result);
    });
});

app.get('/leaderboard',function (req,res) {
    dbhandler.fetchPlayers(function (rows) {
        res.send(rows);
    });
});

app.listen(app.get('port'),function () {
    console.log('Server started at port:'+app.get('port'));
});