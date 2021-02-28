var LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8;


		// tact
		this.multiply = 0;
		this.multiply_Before_max = 2;
		//  life
		this.energy = 6;
		this.energy_Before = this.energy;
		this.mul_counter = 0;
		this.mul_when = 10;

	}

	newDirections() {
		this.directions = [

			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],

			[this.x - 1, this.y],
			[this.x + 1, this.y],

			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]

		];
	}
	chooseCell(character) {
		this.newDirections();
		return super.chooseCell(character);
	}







	move() {

		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);
		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = this.index;
			matrix[this.y][this.x] = 0;
			this.x = newX;
			this.y = newY;

		}
	}
	die() {

		matrix[this.y][this.x] = 0;
		var x = this.x;
		var y = this.y;
		for (var i in grassEaterArr) {
			if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
				grassEaterArr.splice(i, 1);

				break;
			}
		}

	}
	mul() {
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);
		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = this.index;

			var grassEater = new GrassEater(newX, newY, this.index);
			grassEaterArr.push(grassEater);
			this.mul_counter = 0;
		}

	}
	eat() {
		this.multiply++;

		if (this.multiply >= this.multiply_Before_max) {
			var emptyCells_grass = this.chooseCell(1);
			var newCell_grass = random(emptyCells_grass);
			if (newCell_grass) {
				var
					x = newCell_grass[0];
				y = newCell_grass[1];
				matrix[y][x] = this.index;
				matrix[this.y][this.x] = 0;
				this.x = x;
				this.y = y;

				for (var i in grassArr) {
					if (x == grassArr[i].x && y == grassArr[i].y) {
						grassArr.splice(i, 1);
						this.mul_counter++;
						this.energy++;
						if (this.energy >= this.energy_Before) {
							this.energy = this.energy_Before;
						}
						if (this.mul_counter == this.mul_when) {
							this.mul();
						}

						break;
					}
				}


			}
			else {

				this.move();
				this.energy--;

				if (this.energy == 0) {
					this.die();
					this.energy = 0;
				}
			}
			this.multiply = 0;
		}
	}




}