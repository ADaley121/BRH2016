var queries = require('../src/queries');

var pieces = [];

function submit() {
	var completedPieceTypes = [];
	for (i=0; i<pieces.length;i++) {
		var count = 0;
		var piece = pieces[i];
		queries.create_piecetype(
			piece["n"],
			piece["nw"],
			piece["w"],
			piece["sw"],
			piece["s"],
			piece["se"],
			piece["e"],
			piece["ne"],
			piece["icon"],
			piece["isKing"],
			function(piecetype) {
				count = count + 1;
				completedPieceTypes.push(piecetype);

				if count == pieces.length {
					localStorage.setItem('_pieceTypes',completedPieceTypes);
					location.href = 'initial-position.html';
				}
			}
		)
	}
}

function add(n,nw,w,sw,s,se,e,ne,icon,isKing) {
	pieces.push({
		"n": n,
		"nw":nw,
		"w":w,
		"sw":sw,
		"s":se,
		"se":se,
		"e":e,
		"ne":ne,
		"icon":icon,
		"isKing":isKing
	})
}