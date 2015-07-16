	var setBoard = function board (row, col) {
		this.render = function () {
			for (i=1; i=row; i++)
			{
				var createRow = $('<div class="row" id="row' + i + '"></div>');
				
				for (i=1; i=col; i++) {					
					var piece = $('<div class="square" id="col' + i + '"></div>');
					var val = 0;
					// piece.toggle(function(){
					// 	if () {

					// 	}
					// })
					createRow.append(piece);				
				}

				$('.container').append(createRow);
			}
		}
	}
	var board = new setBoard(3, 3);
	board.render();

debugger;

	function playerOne () {
		val = 1;

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