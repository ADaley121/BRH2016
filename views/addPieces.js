var queries = require('../src/queries');

var pieces = [];

function submit() {
	var count = 0;
	var gamestateid = 0 // FIXME: parse URL for id 
	for (i=0; i<pieces.length;i++) {
		var piece = pieces[i];
		queries.create_piecetype(
			gamestateid,
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
				if count == pieces.length {
					location.href = 'initial-position.html?id=' + gamestateid;
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