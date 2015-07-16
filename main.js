console.log('linked');

$(document).ready(function() {

	var board =[];
	var win = false;
	var click = 0;

	player1wins = 0;
	player2wins = 0;

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
					var winner = calculateWin();	
					if (winner === "Player 1") {
						player1wins++;
						$('#player-one-wins').html("<p>Player One Total Wins: " + player1wins + "</p>");
					} else if (winner === "Player 2") {
						player2wins++;
						$('#player-two-wins').html("<p>Player Two Total Wins: " + player2wins + "</p>");
					}	
				});				
				columns.push("");
				createRow.append(piece);			
			}

			board.push(columns);
			$('.container').append(createRow);
		}
	}	
	setBoard(3, 3);

	function setPlayerMoves () {
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
	}

	function calculateWin () {

		for (var j=0; j<board.length; j++) {

			if ((board[j][0]!=="") && (board[j][0] === board[j][1]) && (board[j][1] === board[j][2])) {
				$('#message-box').text(board[j][1] + ' wins!');
				win = true;
				return (board[j][0]);				
			}
		}

		for (var i=0; i<board[0].length; i++) {		
			if ((board[0][i]!=="") && (board[0][i]=== board[1][i]) && (board[1][i] === board[2][i])){
				$('#message-box').text(board[0][i] + ' wins!');
				win = true;	
				return (board[0][i]);
			}
		}

		if (board[1][1] !== "") {
			if ((board[1][1] === board[0][0]) && (board[0][0]=== board[2][2]) || 
				(board[1][1] === board[0][2]) && ((board[0][2]) === board[2][0])) {
				$('#message-box').text(board[1][1] + ' wins!');
				win = true;	
				return(board[1][1]);
			}
		}

		if(board[0].indexOf("") === -1 && board[1].indexOf("") === -1 && board[2].indexOf("") === -1) {
				$('#message-box').text("It's a tie!");
				win = true;
			}
	}

	$('button').click(function resetBoard () {
		$('.container').html(""); 
		$('#message-box').text('');
		win = false;
		board =[];
		click = 0;
		setBoard(3,3);
	});



	function playComputer () {
		
	}

console.log(board);

});