/**
 * Created by piyush on 25/7/16.
 */
'use strict';
const mysql = require('mysql');

function createConnection() {
    let connection = mysql.createConnection({
        host : 'mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/',
        user : 'adminYqXYkYr',
        database : 'pokemon',
        password : 'ML8ghwzu4wwS'
    });
    return connection
}

module.exports = {
    addPlayer : function(player, callBackFunc){
        const conn = createConnection();
        conn.connect();
        const queryString = 'INSERT INTO pokemonplayers(name,score) VALUES(' +
            '"' + player.name + '"' +
            ',' + player.score + ');';
        conn.query(queryString,function (err,result) {
            callBackFunc(result);
        });
        conn.end();
    },
    updateScore : function (player, callBackFunc) {
        const conn = createConnection();
        conn.connect();
        //UPDATE pokemonplayers SET score=player.score WHERE id=player.id;
        const queryString = 'UPDATE pokemonplayers SET' +
            ' score=' + player.score +
            ' WHERE id=' + player.id + ';';
        conn.query(queryString, function (err, result) {
            callBackFunc(result);
        });
        conn.end();
    },
    fetchPlayers : function(callBackFunc) {
        const conn = createConnection();
        conn.connect();
        const queryString = 'SELECT * FROM pokemonplayers ORDER BY score DESC;';
        conn.query(queryString, function (err, rows, fields) {
            callBackFunc(rows);
        });
        conn.end();
    }
};
