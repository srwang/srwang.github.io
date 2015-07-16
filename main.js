console.log('linked');

$(document).ready(function() {

	function setBoard (col, row) {
		var board =[];

		for (j=1; j<row+1; j++){
			var createRow = $('<div class="row" id="row' + j + '"></div>');
			
			var columns = [];
			for (i=1; i<col+1; i++) {					
				var piece = $('<div class="square" id="col' + i + '"></div>');

				var click = 0;
				piece.click(function clickBoardPiece(){
					click++;
					if (click % 2 === 0) {
						$(this).attr('id', 'player1');
						// board[j][i] = "player1";
						// console.log(board[j][i]);
						// console.log(board);

					} else {
						$(this).attr('id', 'player2');
					// 	board[j][i] = "player2";
					// 	console.log(board[j][i]);
					// 	console.log(board);
					}
					console.log(click);
				});
				
				// columns.push("");
				createRow.append(piece);			
			}

			// board.push(columns);
			$('.container').append(createRow);
		}
	}	
	setBoard(3, 3);


// -create 9 boxes (somehow)
// -maybe make a constructor for columns, then push the objects into an array
// -use a for loop to iterate through each arr[index].key, creating a div (w/ class and id) for each object 
// -attach an event listener to each box


});