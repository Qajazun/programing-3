let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature{
	constructor(x, y, index) {
		super(x,y,index);
		this.energy = 5
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
		
		var emptyCells2 = this.chooseCell(2);
		var emptyCells =(emptyCells2);

		let uteliq = Random(emptyCells);

		if (uteliq) {


			let newX = uteliq[0];
			let newY = uteliq[1];

			matrix[newY][newX] = this.index;
			matrix[this.y][this.x] = 0;



				for (let i in grassArr) {
					if (newX === grassArr[i].x && newY === grassArr[i].y) {
						grassArr.splice(i, 1);
						break;
					}
				}
	  
				for (let i in grasseaterArr) {
					if (newX === grasseaterArr[i].x && newY === grasseaterArr[i].y) {
						grasseaterArr.splice(i, 1);
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

		if (this.energy >= 6 && newCell) {
			var x = newCell[0]
			var y = newCell[1]
			matrix[y][x] = 3
			var newPredator = new Predator(x,y,3)
            //var newPredator = new Predator(newCell[0], newCell[1], this.index);
			predatorArr.push(newPredator);
			//matrix[newCell[1]][newCell[0]] = this.index;
			this.energy = 5;
		}
	}

	die() {
		if (this.energy <= 0) {
			matrix[this.y][this.x] = 0;
			for (var i in predatorArr) {
				if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
					predatorArr.splice(i, 1);
				}
			}
		}
	}
}