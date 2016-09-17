// var piecetype = require('./piecetype');
var mysql = require("mysql");
var certs = require("./certs");

var con = mysql.createConnection({
  host: certs.host,
  user: certs.user,
  password: certs.password,
  database: certs.database
});

var piecetype = { movement_n: 1, 
                  movement_nw: 1,
                  movement_w: 1,
                  movement_sw: 1,
                  movement_s: 1,
                  movement_se: 1,
                  movement_e: 1,
                  movement_ne: 1,
                  icon: 'NOPE',
                  is_king: 1 };

var piecetype2 = { movement_n: 2, 
                   movement_nw: 0,
                   movement_w: 2,
                   movement_sw: 0,
                   movement_s: 2,
                   movement_se: 0,
                   movement_e: 2,
                   movement_ne: 0,
                   icon: 'STILLNOPE',
                   is_king: 0 };

var gamestate = { board_length: 8,
                  board_height: 8,
                  turn_playerid: 1 };

con.query('INSERT INTO gamestate SET ?', gamestate, function(gameerr,game) {
  if(gameerr) throw gameerr;
  con.query('INSERT INTO piecetype SET ?', piecetype, function(pterr1,pt1) {
    if(pterr1) throw pterr1;
    con.query('INSERT INTO piecetype SET ?', piecetype2, function(pterr2,pt2) {
      if(pterr2) throw pterr2;
      for(var i = 0; i < 20; i++) {
        var piece = { gamestateid: game.insertId,
                      piecetypeid: i < 10 ? pt1.insertId : pt2.insertId,
                      x_pos: i % 8,
                      y_pos: i / 8,
                      alive: 1,
                      playerid: i % 2 == 0 ? 1 : 0 };
        con.query('INSERT INTO piece SET ?', piece, function(perr,p){
          if(perr) throw perr;
          console.log(p);
        });
      }
    });
  });   
});



