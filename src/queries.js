var mysql = require("mysql");
var certs = require("./certs");

var playerid = 1;
var oplayerid = 0; // FIXME: implement this

var con = mysql.createConnection({
  host: certs.host,
  user: certs.user,
  password: certs.password,
  database: certs.database
});

exports.create_gamestate = function(board_length,board_height,callback) {
  // make gamestate for boardsize, update gid, and give gamestate through callback
  var gamestate = { board_length: board_length,
                    board_height: board_height,
                    turn_playerid: playerid };
  con.query('INSERT INTO gamestate SET ?', gamestate, function(gameerr,game) {
    if(gameerr) throw gameerr;
    gamestate.id = game.insertId;
    callback(gamestate); 
  });
}

exports.create_piecetype = function(n,nw,w,sw,s,se,e,ne,icon,isKing,callback) {
  // make piecetype and give pt through callback
  var piecetype = { movement_n: n, 
                    movement_nw: nw,
                    movement_w: w,
                    movement_sw: sw,
                    movement_s: s,
                    movement_se: se,
                    movement_e: e,
                    movement_ne: ne,
                    icon: icon,
                    is_king: isKing };
  con.query('INSERT INTO piecetype SET ?', piecetype, function(pterr,pt) {
      if(pterr) throw pterr;
      piecetype.id = pt.insertId;
      callback(piecetype);
  });
}

exports.create_piece = function(gid,ptid,x,y,plid,callback) {
  // make piece using gid and give piece through callback
  var piece = { gamestateid: gid,
                piecetypeid: ptid,
                x_pos: x,
                y_pos: y,
                alive: 1,
                playerid: plid };
  con.query('INSERT INTO piece SET ?', piece, function(perr,p) {
      if(perr) throw perr;
      piece.id = p.insertId;
      callback(piece);
  });
}

var get_gamestate = function(callback) {
  // poll gamestate
}

var get_pieces = function(callback) {
  // get the pieces corresponding to gid
}

exports.kill_piece = function(piece,callback) {
  // mark alive to 0 in pieces table for pid
  con.query('UPDATE piece SET alive = 0 Where ID = ?', [piece.id], function (err, res) {
    if (err) throw err;
    piece.alive = 0;
    callback(piece);
  });
}

exports.make_move = function(gamestate, piece, x, y, isWinning, callback) {
  // update piece in database to new square
  // update turn marker in gamestate with gid and isWinning if it is winning move
  con.query('UPDATE piece SET x_pos = ?, y_pos = ? Where ID = ?', [x, y, piece.id], function (err, res) {
    if (err) throw err;
    piece.x_pos = x;
    piece.y_pos = y;
    var sql = isWinning ? 'UPDATE gamestate SET turn_playerid = ?, winner_playerid = ? Where ID = ?'
                        : 'UPDATE gamestate SET turn_playerid = ? Where ID = ?';
    var updates = isWinning ? [oplayerid, playerid, gamestate.id] : [oplayerid, gamestate.id];
    con.query(sql, updates, function (err2, res2) {
      if (err2) throw err2;
      gamestate.turn_playerid = oplayerid;
      if (isWinning) gamestate.winner_playerid = playerid;
      callback(piece, gamestate);
    });
  });
}

