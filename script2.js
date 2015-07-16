					if (arr[j][i] !== arr[j][0]) {
						return
					} else if ((arr[j][arr[j].length-1] === arr[j][0]) && (arr[j][0])!== "") {
						$('#message-box').text(arr[j][i] + ' wins!');
						win = true;
					}
				}

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