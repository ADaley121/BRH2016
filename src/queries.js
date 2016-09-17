var mysql = require("mysql");
var certs = require("./certs");

var gid = 0;

var con = mysql.createConnection({
  host: certs.host,
  user: certs.user,
  password: certs.password,
  database: certs.database
});

var create_gamestate = function(board_size) {
  // make gamestate for boardsize and update gid
}

var create_piecetype = function(n,nw,w,sw,s,se,e,ne,icon,isKing) {
  // make piecetype
}

var create_piece = function(ptid,x,y,plid) {
  // make piece using gid
}

exports.get_gamestate = function(callback) {
  // poll gamestate
  con.query('SELECT * FROM gamestate WHERE id = ${gid}', function(err, gamestate) {
    callback(err, gamestate)
  })
}

var get_pieces = function(callback) {
  // get the pieces corresponding to gid
}

var kill_piece = function(pid,callback) {
  // mark alive to 0 in pieces table for pid
}

var make_move = function(pid, x, y, isWinning, callback) {
  // update piece in database to new square
  // update turn marker in gamestate with gid and isWinning if it is winning move
}

