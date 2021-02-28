var LivingCreature = require("./LivingCreature");

 
module.exports = class Grass extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.multiply = 0;
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

	mul() {

		this.multiply++;
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);
		if (newCell && this.multiply >= 4) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = this.index;
			var newGrass = new Grass(newX, newY, this.index)
			grassArr.push(newGrass);
			this.multiply = 0;
		}
	}
}