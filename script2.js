					if (arr[j][i] !== arr[j][0]) {
						return
					} else if ((arr[j][arr[j].length-1] === arr[j][0]) && (arr[j][0])!== "") {
						$('#message-box').text(arr[j][i] + ' wins!');
						win = true;
					}
				}

		
		// [0,0], [1,1], [2,2]
		// [0,2], [1,1], [2,0]

		// [0,0], [1,2], [2,2], [3,3], [4,4]

		// [0, 0], [math.ceil(board.length / 2), math.ceil(board.length / 2)], [board.length-1, board.length-1]
		// [0, board.length-1], 

		// col increments up
		// row increments down
		// etc 

	// var columns = [];
// var board = [];

// function createCol (cols) {
// 	for (i=1; i=cols; i++) {
// 		columns.push("col" + i);
// 	}
// }

// createCol(3);

// function createRows (colArr, rows) {
// 	for (i=1; i=rows; i++) {
// 		board.push({colArr});
// 	}
// }

// createRows(columns, 3);

// debugger;