console.log('linked');

$(document).ready(function() {

	var board =[];
	var win = false;

	function setBoard (col, row) {


		for (j=0; j<row; j++){
			var createRow = $('<div class="row" id="' + j + '"></div>');
			
			var columns = [];
			for (i=0; i<col; i++) {					
				var piece = $('<div class="square" id="' + i + '"></div>');

				var click = 0;
				piece.click(function clickBoardPiece(){

					var colId = $(this).attr('id');
					var rowId = $(this).parent().attr('id');

					if (win === false) {
						if (click % 2 === 0) {
							board[rowId][colId] = "player1";
							$(this).css('background-color', 'red');
						} else {
							board[rowId][colId] = "player2";
							$(this).css('background-color', 'yellow');
						}
						click++;
					}					
				});				
				columns.push("");
				createRow.append(piece);			
			}

			board.push(columns);
			// console.log(board[0][0])
			$('.container').append(createRow);
		}
	}	
	setBoard(3, 3);


	function calculateWin (arr) {

	for (var i =0; i<arr[0].length; i++) {
		if (arr[0][i] !== arr[0][0]) {
			return
		} else {

		}
	}


	}
	calculateWin(board);


// -create 9 boxes (somehow)
// -maybe make a constructor for columns, then push the objects into an array
// -use a for loop to iterate through each arr[index].key, creating a div (w/ class and id) for each object 
// -attach an event listener to each box


});