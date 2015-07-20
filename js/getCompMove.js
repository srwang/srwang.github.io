		//counter vertical
		for (var col=0; col<boardSize; col++) {
			var countOne = 0;
			var countTwo = 0;
			var rowArr = [];
			for (var row =0; row < boardSize; row ++) {
				rowArr.push(board[row][col]);
				if (typeof(calcStraightMove (row, col, rowArr)) ==! undefined) {
					return calcStraightMove (row, col, rowArr);
				}
			}
		}
		function calcStraightMove (row, col, arr) {
			if (board[row][col] === "Player 1") {
					countOne++;
				}
			if (board[row][col] === "Player 2") {
				countTwo++;
			} 				
			if (countTwo === (boardSize - 1) && arr.length=== boardSize && arr.indexOf("") !== -1) {
				row = arr.indexOf("");
				board[row][col] = "Player 2";
				return [row, col];					
			}  else if (countOne === (boardSize - 1) && arr.length=== boardSize && arr.indexOf("") !== -1) {
				row = arr.indexOf("");
				board[row][col] = "Player 2";
				return [row, col];	
			} else {
				return getCompMove ();
			}
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