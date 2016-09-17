function drawBoard(){
    var selectedSize = document.getElementById("sel1");
    var size = selectedSize.options[selectedSize.selectedIndex].value;
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 900 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;
    
    d3.select("svg").remove();
    
    var svg = d3.select("#checkboard-canvas")
        .append("svg")
        .attr("id", "checkerboard")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "background-yellow")
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
            
    //For each column
    for (i = 0; i<size; i++) {
        //Draw a row of the chessboard.
        if (i%2 ==0) {
            for (j = 0; j<size; j++) {
                var xid = j.toString();
                var yid = i.toString();
                var squareId = xid.concat("-", yid);
                
                if (j%2 == 0) {
                    var rectangle = svg.append("rect")
                            .attr("class", "white-square")
                            .attr("x", (j*(width/size)))
                            .attr("y", (i*(width/size)))
                            .attr("width", width/size)
                            .attr("height", height/size)
                            .attr("fill", "white")
                            .attr("fill-opacity", 1);
                }
                else {
                    var rectangle = svg.append("rect")
                            .attr("class", "black-square")
                            .attr("id", )
                            .attr("x", (j*(width/size)))
                            .attr("y", (i*(width/size)))
                            .attr("width", width/size)
                            .attr("height", height/size)
                            .attr("fill", "black")
                            .attr("fill-opacity", 1);
                }
            }
        }
        else {
            for (j = 0; j<size; j++) {
                if (j%2 == 0) {
                    var rectangle = svg.append("rect")
                            .attr("class", "black-square")
                            .attr("x", (j*(width/size)))
                            .attr("y", (i*(width/size)))
                            .attr("width", width/size)
                            .attr("height", height/size)
                            .attr("fill", "black")
                            .attr("fill-opacity", 1);
                }
                else {
                    var rectangle = svg.append("rect")
                                .attr("class", "white-square")
                                .attr("x", (j*(width/size)))
                                .attr("y", (i*(width/size)))
                                .attr("width", width/size)
                                .attr("height", height/size)
                                .attr("fill", "white")
                                .attr("fill-opacity", 1);
                }
            }
        }
    }
}

function drawPiece(xPos, yPos, pieceType) {
    var piecelist = '{"pieceTypes":[' + '{"WhiteKing":"&#9812;"},' + 
    '{"WhiteQueen":"&#9813;"},' + '{"WhiteRook":"&#9814;"},' + 
    '{"WhiteBishop":"&#9815;"},' + '{"WhiteKnight":"&#9816;"},' + 
    '{"WhitePawn":"&#9817;"},' + '{"BlackKing":"&#9818;"},' + 
    '{"BlackQueen":"&#9819;"},' + '{"BlackRook":"&#9820;"},' + 
    '{"BlackBishop":"&#9821;"},' + '{"BlackKnight":"&#9822;"},' + 
    '{"BlackPawn":"&#9823;"}]}';
    
    
    for (key in piecelist) {
        if(piecelist.hasOwnProperty(key)) {
            if (key ==  pieceType) {
                var unicode = piecelist[key];
                var squareToPlace = xPos.concat("-", yPos);
                var boardSquare = document.getElementById(squareToPlace);
                var rectangle = boardSquare.append("text")
                            .attr("x", 0)
                            .attr("y", 1)
                            .html(unicode);
            }
        }
    }
}