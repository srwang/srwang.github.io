console.log('linked');

$(document).ready(function() {
	var game = "";
	var board =[];
	var win = false;
	var click = 0;

	player1wins = 0;
	player2wins = 0;

	function choosePlayerOrAI () {
		$('#two-players').click(function(){
			game = "playerGame";
			resetBoard();
			$('#player-one-wins').children().text("Player One Total Wins: ");
			$('#player-two-wins').children().text("Player Two Total Wins: ");
		});
		$('#play-computer').click(function(){
			game = "computerGame";
			resetBoard();
			$('#player-one-wins').children().text("Human Player Total Wins: ");
			$('#player-two-wins').children().text("AI Total Wins: ");
		});
	}
	choosePlayerOrAI();

	function setBoard (col, row) {

		for (j=0; j<row; j++){
			var createRow = $('<div class="row" id="' + j + '"></div>');
			
			var columns = [];
			for (i=0; i<col; i++) {					
				var piece = $('<div class="square" id="' + i + '"></div>');

				piece.click(function clickBoardPiece(){

					var colId = $(this).attr('id');
					var rowId = $(this).parent().attr('id');

					if (game === "") {
						alert("Please choose player game or AI game");
					} else if (game === "playerGame") {
						if (win === false && board[rowId][colId] === "") {
							if (click % 2 === 0) {
								board[rowId][colId] = "Player 1";
								$(this).css('background-color', 'red');
							} else {
								board[rowId][colId] = "Player 2";
								$(this).css('background-color', 'yellow');
							}
						} 
					} else if (game === "computerGame"){
							if (win === false && board[rowId][colId] === "") {
								board[rowId][colId] = "Player 1";
								$(this).css('background-color', 'red');

								if (win === false && click<=3) {
									var compMove = getCompMove();
									console.log(compMove);
									var compBox = $('.row').eq(compMove[0]).find('#' + compMove[1]);
									compBox.css('background-color', 'yellow');									
								} 
							}
					}
					click++;	
					updateWins();
				});				
				columns.push("");
				createRow.append(piece);			
			}

			board.push(columns);
			$('.container').append(createRow);
		}
	}	
	setBoard(3, 3);

	function updateWins () {
		var winner = calculateWin();
		if (winner === "Player 1") {
			player1wins++;
			$('#player-one-wins').children().append(player1wins);
		} else if (winner === "Player 2") {
			player2wins++;
			$('#player-two-wins').children().append(player2wins);
		}	
	}

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

	$('#reset-board').click(resetBoard);
	function resetBoard() {
		$('.container').html(""); 
		$('#message-box').text('');
		win = false;
		board =[];
		click = 0;
		setBoard(3,3);
	}

	function getCompMove () {

//if player one has taken over all but one (i.e 2) spaces in a row, column, or diagonal 
		for (var row=0; row<board.length; row++) {
				var countOne = 0;
				var countTwo = 0;
				for (var col = 0; col < board[row].length; col++) {
					if (board[row][col] === "Player 1") {
						countOne++;
					}
					if (board[row][col] === "Player 2") {
						countTwo++;
					} 
				}	
				if ((countTwo === (board[row].length - 1)) && (board[row].indexOf("") !== -1)) {
					col = board[row].indexOf("");
					board[row][col] = "Player 2";
					return [row, col];					
				}  else if ((countOne === (board[row].length - 1)) && (board[row].indexOf("") !== -1)) {
					col = board[row].indexOf("");
					board[row][col] = "Player 2";
					return [row, col];	
				}
		}
		return findRandomMove();
	}

	function findRandomMove () {
		var row = Math.floor(Math.random()*(board.length));			
		var col = Math.floor(Math.random()*(board[row].length));
			if (board[row][col] === "") {
				board[row][col] = "Player 2";
				return [row, col];
			} else {
				return findRandomMove(); 
			}
	}
});