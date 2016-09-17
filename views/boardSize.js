var queries = require('../src/queries.js');

function submitBoardSize(length, height) {
	queries.create_gamestate(length, height, function(gamestate) {
		localStorage.setItem('_gamestate', gamestate);
		local.href = "create-pieces.html";
	});
};