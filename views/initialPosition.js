var queries = require('../src/queries.js');
var url = require('url');

//get the game id from url
var params = url.query(window.location.href,true,false);
var gsid = params.id; 

var pieces = [];

function submit() {
	var count = 0;
	for (i=0;i<pieces.length;i++) {
		var p = pieces[i];
		queries.create_piece(gsid, p["ptid"], p["x"], p["y"], p["plid"], function(piece) {
			count = count + 1;
			if count == pieces.length {
				queries.create_game(gsid, 1, function(game) {
					console.log(game);
				});
				location.href = "game.html";
			}
		})
	}
}

function addPiece(ptid, ownPiece, x, y) {
	var plid = ownPiece ? 1 : 2;
	pieces.push({
		"ptid":ptid,
		"plid":plid,
		"x":x,
		"y":y
	});
}

function removePiece(x, y) {
	for (i=0;i<pieces.length;i++) {
		var p = pieces[i];
		if p["x"] == x && p["y"] == y {
			pieces.splice(i,1);
			break;
		}
	}
}