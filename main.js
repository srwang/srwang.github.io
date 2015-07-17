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
		//counter horizontal
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
		}

		//counter vertical
		for (var col=0; col<board[0].length; col++) {
			var countOne = 0;
			var countTwo = 0;
			var rowArr = [];
			for (var row =0; row < board.length; row ++) {
				rowArr.push(board[row][col]);
				if (board[row][col] === "Player 1") {
						countOne++;
					}
					if (board[row][col] === "Player 2") {
						countTwo++;
					} 				
					if (countTwo === (board.length - 1) && rowArr.length===3 && rowArr.indexOf("") !== -1) {
						row = rowArr.indexOf("");
						board[row][col] = "Player 2";
						return [row, col];					
					}  else if (countOne === (board.length - 1) && rowArr.length===3 && rowArr.indexOf("") !== -1) {
						row = rowArr.indexOf("");
						board[row][col] = "Player 2";
						return [row, col];	
					}
			}
		}

		//counter diagonal
			var diagArrOne = [];
			var diagArrTwo = [];
			var countOne = 0;
			var countTwo = 0;
			for (var i=0; i<board.length; i++) {
				diagArrOne.push(board[i][i]);
				diagArrTwo.push(board[i][(board.length - 1 - i)]);
			}
			for (var j=0; j<diagArrOne.length; j++) {
				if (diagArrOne[j] === "Player 1") {
					countOne++;
				} else if (diagArrOne[j] === "Player 2") {
					countTwo++;					
				} 
				if (countTwo === (board.length -1) && diagArrOne.length === 3 && diagArrOne.indexOf("") !== -1) {
					var row = diagArrOne.indexOf("");
					board[row][row] = "Player 2";
					return[ row, row];
				}
				if (countOne === (board.length -1) && diagArrOne.length === 3 && diagArrOne.indexOf("") !== -1) {
					var row = diagArrOne.indexOf("");
					board[row][row] = "Player 2";
					return [row, row];
				}
			}

			for(var k=0; k<diagArrTwo.length; k++) {
				if (diagArrTwo[k] === "Player 1") {
					countOne++;
				} else if (diagArrOne[k] === "Player 2") {
					countTwo++;		  			
				} 
				if (countTwo === (board.length -1) && diagArrTwo.length === 3 && diagArrTwo.indexOf("") !== -1) {
					row = diagArrTwo.indexOf("");
					board[row][board.length - 1 - row] = "Player 2"
					return[row, (board.length-1 -row)];
				}
				if (countOne === (board.length -1) && diagArrTwo.length === 3 && diagArrTwo.indexOf("") !== -1) {
					row = diagArrTwo.indexOf("");
					board[row][board.length - 1 - row] = "Player 2"
					return[row, (board.length-1 -row)];
				}
			}

		return findRandomMove();

		function findRandomMove () {
			console.log("clicked")
			var row = Math.floor(Math.random()*(board.length));			
			var col = Math.floor(Math.random()*(board[row].length));
				if (board[row][col] === "") {
					board[row][col] = "Player 2";
					return [row, col];
				} else {
					return findRandomMove(); 
				}
		}
	}

	//fix to make interactive based on initial board length input from user
	$('#save-game').click(function(){
		if($(this).hasClass("saved")) {
			game = sessionStorage.getItem("game");
			var savedBoard = sessionStorage.getItem("board").split(",");
			var newBoard = [];

			for (i=0; i<board.length; i++) {
				newBoard.push(savedBoard.slice(i*board.length, (i+1)*board.length))
			}
			resetBoard();

			for (i=0; i<newBoard.length; i++){
				for (j=0; j<newBoard[0].length; j++) {
					if (newBoard[i][j]=== "Player 1") {
						$('.row').eq(i).find('#' + j).css('background-color', 'red');  
					} else if (newBoard[i][j]=== "Player 2") {
						$('.row').eq(i).find('#' + j).css('background-color', 'yellow'); 
					}				
				}
			}
			$(this).text("Save game");
			$(this).removeClass("saved");
		} else {
			sessionStorage.setItem("board", board);
			sessionStorage.setItem("game", game);
			$(this).text("Restore last saved game")
			$(this).addClass("saved");
		}

	});

});