var LivingCreature = require("./LivingCreature");



module.exports = class Bomber extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index)
		this.multiply = 0;


		this.multiply_Before_max = 5;

		this.tact_found_move = 0;
		this.random_move = 0;
	}

	newDirections() {
		this.directions = [

			[this.x, this.y - 1],
			[this.x - 1, this.y],

			[this.x + 1, this.y],
			[this.x, this.y + 1],

		];
	}

	chooseCell(character) {
		this.newDirections();
		return super.chooseCell(character);
	}

	move() {
		this.multiply++;

		if (this.multiply >= this.multiply_Before_max) {
			this.newDirections();
			this.tact_found_move++;


			if (this.tact_found_move == Random(4, 10)) {

				this.random_move = Random(0, 3);
				this.tact_found_move = 0;

			}


			var noric = false;

			while (true) {
				var newCell = this.directions[this.random_move];
				if (newCell[0] < 0 || newCell[0] > matrix[0].length - 1 || newCell[1] < 0 || newCell[1] > matrix.length - 1) {
					noric = true;
				} else {
					noric = false;
				}

				if (noric) {

					this.random_move = Random(0, 3);
					this.tact_found_move = 0;
				}

				else {
					break;
				}
			}

			if (newCell) {
				var
					x = newCell[0];
				y = newCell[1];
				matrix[y][x] = this.index;
				matrix[this.y][this.x] = 0;
				this.x = x;
				this.y = y;

				for (var i in grassArr) {
					if (x == grassArr[i].x && y == grassArr[i].y) {
						grassArr.splice(i, 1);
						break;
					}
				}
				for (var i in grassEaterArr) {
					if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
						grassEaterArr.splice(i, 1);
						break;
					}
				}
				for (var i in wolfArr) {
					if (x == wolfArr[i].x && y == wolfArr[i].y) {
						wolfArr.splice(i, 1);
						break;
					}
				}
				for (var i in LavaArr) {
					if (x == LavaArr[i].x && y == LavaArr[i].y) {
						LavaArr.splice(i, 1);
						break;
					}
				}

				this.multiply = 0;
			}
		}


	}
}