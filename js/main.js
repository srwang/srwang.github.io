console.log('yo');

$(document).ready(function() {
	var boardSize = 3;
	var game = "default";
	var board =[];
	var win = false;
	var click = 0;

	var player1wins = 0;
	var player2wins = 0;

	var nameOne = "";
	var nameTwo = "";
	

	$('#choose-player').change(function choosePlayerOrAI(){
		game = $(this).val();
		resetBoard(boardSize);
		player1wins = 0;
		player2wins = 0;
		$('#player-one-wins').text("");
		$('#player-two-wins').text("");

		if (game==="playerGame") {
			$('#player-one-text').text("Player 1 score:");
			$('#player-two-text').text("Player 2 Score:");
			$('form').slideDown(600);
		} else if (game==="computerGame") {
			$('#player-one-text').text("Human Player Score:");
			$('#player-two-text').text("AI Score:");
			$('form').slideUp(600);
		}
		changeSquareCSS(boardSize);
	})

	$('#input-name').click(function getPlayerNames(){
		nameOne = $('input').eq(0).val();
		nameTwo = $('input').eq(1).val();
		$('#player-one-text').text(nameOne + " Score:");
		$('#player-two-text').text(nameTwo + " Score:");
		$('form').slideUp(600);
	});


	$('#choose-board-size').change(function chooseBoardSize(){
		boardSize = parseInt($(this).val());
		resetBoard(boardSize);
		changeSquareCSS(boardSize);
	})

	function changeSquareCSS(boardSize) {
		if (boardSize === 4) {
			$('.square').css({height: 150, width: 150});
		} else if (boardSize === 5) {
			$('.square').css({height: 120, width: 120});
		}
	}

	function setBoard (col, row) {

		for (j=0; j<row; j++){
			var createRow = $('<div class="myRow" id="' + j + '"></div>');
			
			var columns = [];
			for (i=0; i<col; i++) {					
				var piece = $('<div class="square animated flipInX" id="' + i + '"></div>');

				piece.click(function clickBoardPiece(){
					$("#message-box").children().text("Playing game...");

					var colId = $(this).attr('id');
					var rowId = $(this).parent().attr('id');
					if (game==="default") {
						alert("Please choose two-player game or game against computer!");
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

							if (win === false && click<=(Math.floor((boardSize * boardSize) / 2)-1)) {
								console.log(
									Math.floor((boardSize * boardSize) / 2)-1
								)
								var compMove = getCompMove();
								var compBox = $('.myRow').eq(compMove[0]).find('#' + compMove[1]);
								function changeToYellow () {
									compBox.css('background-color', 'yellow');
								}
								window.setTimeout(changeToYellow, 250);									
							} 								
						} 
					}
					click++;	
					calculateWin();
				});				
				columns.push("");
				createRow.append(piece);			
			}

			board.push(columns);
			$('.wrapper').append(createRow);
			changeSquareCSS(boardSize);
		}
	}	
	setBoard(boardSize, boardSize);


	function calculateWin () {

		for (var row=0; row<boardSize; row++) {
			var allEquals = true;
				for (var col=0; col<boardSize; col++) {
					if (board[row][col] !== board[row][0]) {
						allEquals = false;
					} 
				}
				if (allEquals === true && board[row].indexOf("") === -1) {
					return displayWin(board[row][0]);
				}
		}

		for (var col=0; col<boardSize; col++) {
			var allEquals = true;
			var rowArr = [];
				for (var row=0; row<boardSize; row++) {
					rowArr.push(board[row][col]);
					if (board[row][col] !== board[0][col]) {
						allEquals = false;
					}
				}
				if (allEquals === true && rowArr.indexOf("") === -1) {
					return displayWin(board[0][col]);
				}
		}

			var diagOne = [];
			var diagTwo = [];
		for (var i=0; i<boardSize; i++) {
			diagOne.push(board[i][i])
			diagTwo.push(board[i][boardSize-1-i])

			calcDiagWin(diagOne);
			calcDiagWin(diagTwo);

			function calcDiagWin (arr) {
			var allEquals = true;
				for (j=0; j<boardSize; j++) {
					if (arr[j] !== arr[0]) {
						allEquals = false;
					}
				}
			if (allEquals === true && arr.indexOf("") === -1) {
					return displayWin(arr[0]);
				}			
			}
		}

		var tie = true;
		for (var i=0; i<boardSize; i++) {
			if(board[i].indexOf("") !== -1) {
				tie = false;
			} 
		}
		if (tie === true) {
			$('#message-box').children().text("It's a tie!");
			win = true;
			$('container').removeClass('won');
		}			
	

		function displayWin (player) {

			if ($('container').hasClass('won')) {
				if (player === "Player 1") {
					player1wins++;
					$('#player-one-wins').text(player1wins);
				} else if (player === "Player 2") {
					player2wins++;
					$('#player-two-wins').text(player2wins);
				}						
			}
			if (player === "Player 1") {
				if (game === "playerGame") {
					player = nameOne;
				} else if (game ==="computerGame") {
					player = "Human player";
				}
			} else if (player === "Player 2") {
				if (game=== "playerGame") {
					player = nameTwo;
				} else if (game === "computerGame") {
					player = "Computer"
				}
			}
			$('#message-box').children().text(player + " wins!");
			win = true;
			$('container').removeClass('won');
		}
	}


	function resetBoard(boardSize) {
		$('.wrapper').html(""); 
		$('#message-box').children().text('');
		$('container').addClass('won');
		win = false;
		board =[];
		click = 0;
		setBoard(boardSize, boardSize);
	}

	$('#reset-board').click(function(){
		resetBoard(boardSize);
	});

function getCompMove () {
		//counter horizontal
		for (var row=0; row<boardSize; row++) {
		var countOne = 0;
		var countTwo = 0;

				for (var col = 0; col < boardSize; col++) {
					if (board[row][col] === "Player 1") {
						countOne++;
					}
					if (board[row][col] === "Player 2") {
						countTwo++;
					} 
						
					if ((countTwo === (boardSize - 1)) && (board[row].indexOf("") !== -1)) {
						col = board[row].indexOf("");
						board[row][col] = "Player 2";
						return [row, col];					
					}  else if ((countOne === (boardSize - 1)) && (board[row].indexOf("") !== -1)) {
						col = board[row].indexOf("");
						board[row][col] = "Player 2";
						return [row, col];	
					}
				}	
		}

		// counter vertical
		for (var col=0; col<boardSize; col++) {
			var countOne = 0;
			var countTwo = 0;
			var rowArr = [];
			for (var row =0; row < boardSize; row ++) {
				rowArr.push(board[row][col]);
				if (board[row][col] === "Player 1") {
						countOne++;
				}
				if (board[row][col] === "Player 2") {
					countTwo++;
				} 				
				if (countTwo === (boardSize - 1) && rowArr.indexOf("") !== -1) {
					row = rowArr.indexOf("");
					board[row][col] = "Player 2";
					return [row, col];					
				}  else if (countOne === (boardSize - 1) && rowArr.indexOf("") !== -1) {
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

			for (var i=0; i<boardSize; i++) {
				diagArrOne.push(board[i][i]);
				diagArrTwo.push(board[i][(boardSize - 1 - i)]);
			}
			for (var j=0; j<diagArrOne.length; j++) {
				if (diagArrOne[j] === "Player 1") {
					countOne++;
				} else if (diagArrOne[j] === "Player 2") {
					countTwo++;					
				} 
				if (countTwo === (boardSize -1) && diagArrOne.indexOf("") !== -1) {
					var row = diagArrOne.indexOf("");
					board[row][row] = "Player 2";
					return[ row, row];
				}
				if (countOne === (boardSize -1) && diagArrOne.indexOf("") !== -1) {
					var row = diagArrOne.indexOf("");
					board[row][row] = "Player 2";
					return [row, row];
				}
			}

			var countThree = 0;
			var countFour = 0;
			for(var k=0; k<diagArrTwo.length; k++) {
				if (diagArrTwo[k] === "Player 1") {
					countThree++;
				} else if (diagArrOne[k] === "Player 2") {
					countFour++;		  			
				} 
				if (countThree === (boardSize -1) && diagArrTwo.indexOf("") !== -1) {
					row = diagArrTwo.indexOf("");
					board[row][boardSize - 1 - row] = "Player 2"
					return[row, (boardSize -1 -row)];
				}
				if (countFour === (boardSize -1) && diagArrTwo.indexOf("") !== -1) {
					row = diagArrTwo.indexOf("");
					board[row][boardSize - 1 - row] = "Player 2"
					return[row, (boardSize-1 -row)];
				}
			}

		return findRandomMove();

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
	}

	//fix to make interactive based on initial board length input from user
	$('#save-game').click(function(){
		if($(this).hasClass("saved")) {
			game = sessionStorage.getItem("game");
			if (game==="playerGame") {
				$('#player-one-text').text(nameOne + " Score:");
				$('#player-two-text').text(nameTwo + " Score:");
			} else if (game==="computerGame") {
				$('#player-one-text').text("Human Player Score:");
				$('#player-two-text').text("AI Score:");
			}

			var savedBoard = sessionStorage.getItem("board").split(",");
			var newBoard = [];
			var newBoardSize = parseInt(sessionStorage.getItem("boardSize"));

			for (i=0; i<newBoardSize; i++) {
				newBoard.push(savedBoard.slice(i*newBoardSize, (i+1)*newBoardSize))
			}
			resetBoard(newBoardSize);
			changeSquareCSS(newBoardSize);

			for (i=0; i<newBoard.length; i++){
				for (j=0; j<newBoard[0].length; j++) {
					if (newBoard[i][j]=== "Player 1") {
						$('.myRow').eq(i).find('#' + j).css('background-color', 'red');  
					} else if (newBoard[i][j]=== "Player 2") {
						$('.myRow').eq(i).find('#' + j).css('background-color', 'yellow'); 
					}				
				}
			}
			$(this).text("Save game");
			$(this).removeClass("saved");
		} else {
			$('#message-box').children().text("Saved!");
			sessionStorage.setItem("board", board);
			sessionStorage.setItem("game", game);
			sessionStorage.setItem("nameOne", nameOne);
			sessionStorage.setItem("nameTwo", nameTwo);
			sessionStorage.setItem("boardSize", boardSize);
			$(this).text("Restore")
			$(this).addClass("saved");
		}

	});

});