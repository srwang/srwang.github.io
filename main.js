console.log('linked');

$(document).ready(function() {

	var board =[];
	var win = false;
	var click = 0;

	function setBoard (col, row) {


		for (j=0; j<row; j++){
			var createRow = $('<div class="row" id="' + j + '"></div>');
			
			var columns = [];
			for (i=0; i<col; i++) {					
				var piece = $('<div class="square" id="' + i + '"></div>');

				piece.click(function clickBoardPiece(){

					var colId = $(this).attr('id');
					var rowId = $(this).parent().attr('id');

					if (win === false) {
						if (click % 2 === 0) {
							board[rowId][colId] = "Player 1";
							$(this).css('background-color', 'red');
						} else {
							board[rowId][colId] = "Player 2";
							$(this).css('background-color', 'yellow');
						}
						click++;
					}
					calculateWin();				
				});				
				columns.push("");
				createRow.append(piece);			
			}

			board.push(columns);
			$('.container').append(createRow);
		}
	}	
	setBoard(3, 3);


	function calculateWin () {

		for (var j=0; j<board.length; j++) {

			// console.log (board[j]);

			// if (board[j][0] === board[j][1]) {
			// 	console.log(true)
			// } else { console.log(false)}

			if ((board[j][0]!=="") && (board[j][0] === board[j][1]) && (board[j][1] === board[j][2])) {
				$('#message-box').text(board[j][1] + ' wins!');
				win = true;
			}
		}

		for (var i=0; i<board[0].length; i++) {		
			if ((board[0][i]!=="") && (board[0][i]=== board[1][i]) && (board[1][i] === board[2][i])){
				$('#message-box').text(board[0][i] + ' wins!');
				win = true;	
			}
		}

		if (board[1][1] !== "") {
			if ((board[1][1] === board[0][0]) && (board[0][0]=== board[2][2]) || 
				(board[1][1] === board[0][2]) && ((board[0][2]) === board[2][0])) {
				$('#message-box').text(board[1][1] + ' wins!');
				win = true;	
			}
		}
	}

console.log(board);

// -create 9 boxes (somehow)
// -maybe make a constructor for columns, then push the objects into an array
// -use a for loop to iterate through each arr[index].key, creating a div (w/ class and id) for each object 
// -attach an event listener to each box


});