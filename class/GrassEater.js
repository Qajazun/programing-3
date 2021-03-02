let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);

		this.energy = 5;
		this.directions = [];
	}


	move() {

		let emptyCells = this.chooseCell(0);
		let newCell = Random(emptyCells);

		if (newCell) {
			

			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = this.index
			matrix[this.y][this.x] = 0;


			this.x = newX;
			this.y = newY;
			this.energy--;

		}

	}




	eat() {
		let emptyCells = this.chooseCell(1);
		let grass = Random(emptyCells);

		if (grass) {
			let newX = grass[0];
			let newY = grass[1];
			matrix[newY][newX] = this.index;
			matrix[this.y][this.x] = 0;

			for (let i in grassArr) {
				if (newX === grassArr[i].x && newY === grassArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}
			}
			this.x = newX;
			this.y = newY;
			this.energy += 2
		}
	}


	mul() {


		var newCell = Random(this.chooseCell(0));
		if (this.energy >= 15 && newCell) {
			var x = newCell[0]
			var y = newCell[1]
			matrix[y][x] = 2
			var newGrassEater = new GrassEater(x, y, 2);
			grasseaterArr.push(newGrassEater);
			this.energy = 5;
		}
	}
	die() {

		if (this.energy <= 0) {
			matrix[this.y][this.x] = 0;

			for (var i in grasseaterArr) {
				if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
					grasseaterArr.splice(i, 1);
				}
			}
		}
	}
}