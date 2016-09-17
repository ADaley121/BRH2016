var queries = require('../src/queries.js');

function submitBoardSize(length, height) {
	queries.create_gamestate(length, height, function(gamestate) {
		location.href = "create-pieces.html";
	});
};