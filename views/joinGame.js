var queries = require('../src/queries');

function submit(gameid) {
  queries.join_game(gameid,2,function(worked) {
    if (worked) {
      location.href = 'game.html?id=' + gameid;
    }
  });
}