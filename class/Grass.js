let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
	constructor(x, y, index) {
		super(x,y,index);
			}
	mul() {
		this.multiply++;
		var newCell = Random(this.chooseCell(0));
		if (this.multiply >= 1 && newCell) {
			matrix[newCell[1]][newCell[0]] = 1;
			var newGrass = new Grass(newCell[0], newCell[1], this.index);
			grassArr.push(newGrass);
			this.multiply = 0;
		}
	}
}
