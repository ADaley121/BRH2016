var queries = require('../src/queries');
var url = require('url');

var pieceTypes = [];
var pieces = [[]];
var gameState = {};

var params = url.query(window.location.href,true,false);
var plid = params.playerid; 

var selectedPosition = null;

var ownTurn = false;

function pollForJoin(callback) {

}

function pollForMove(callback) {

}

function initializeGame(callback) {
	//callback(array of all piece positions and icons)
}

//callback takes array of positions
function selectSquare(x, y, callback) {
	if (gameState.turn_playerid == plid) {
		if (selectedPosition == null) {
			if (pieces[x][y] != null) && (pieces[x][y].playerid == plid) {
				selectedPositon = {"x":x, "y":y}
				//callback color them green
			}
		} else {
			if (pieces[x][y] == null) {
				//check if valid and move
			} else if (pieces[x][y].playerid == plid) {
				selectedPositon = {"x":x, "y":y}
				//callback color them green
				//unhighlight previously selected pieces available squares
			} else {
				//check if valid move
				//if valid, destroy other piece, move the piece there, remove highlighted squares, check if there is a winner and set selectedPosition to null
			}
		}
	}
}