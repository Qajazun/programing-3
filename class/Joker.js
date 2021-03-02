   let LivingCreature = require('./LivingCreature')

module.exports = class Joker extends LivingCreature{
	constructor(x, y, index) {
		super(x,y,index);
		this.energy = 5;
		
		this.directions = [];
	}
	
	move() {
		var emptyCells0 = this.chooseCell(0);
		var emptyCells1 = this.chooseCell(1);
		var emptyCells = emptyCells0.concat(emptyCells1);
		let newCell = Random(emptyCells);

		if(newCell) {

			let newX = newCell[0];
			let newY = newCell[1];

				if(matrix[newY][newX] == 0){
				matrix[this.y][this.x] = 0;
				matrix[newY][newX] = this.index
				}
				if(matrix[newY][newX] == 1){
					matrix[this.y][this.x] = 1;
					matrix[newY][newX] = this.index
					}
					if(matrix[newY][newX] == 2){
						matrix[this.y][this.x] = 2;
						matrix[newY][newX] = this.index
						}
				
			this.x = newX;
			this.y = newY;
			this.energy--;

		}
		
	}
	eat() {
		let emptyCells = this.chooseCell(1,3);
		let predator = Random(emptyCells);

		if(predator){
			let newX = predator[0];
			let newY = predator[1];

			matrix[newY][newX] = this.index;
			matrix[this.y][this.x] = 0;

			for(let i in predatorArr) {
				if(newX === predatorArr[i].x && newY === predatorArr[i].y) {
					predatorArr.splice(i,1);
					break;
				}
			}


			this.x = newX;
			this.y = newY;
			this.energy+=2   
		}   
	}
	mul() {
  
		var newCell = Random(this.chooseCell(0));

		if (this.energy >=6  && newCell) {
			var x = newCell[0]
			var y = newCell[1]
			matrix[y][x] = 4
			var newJoker = new Joker(x, y, 4);
            JokerArr.push(newJoker);
			//matrix[newCell[1]][newCell[0]] = this.index;
			this.energy = 5;
		}
	}
	die() {
		if (this.energy <= 0) {
			matrix[this.y][this.x] = 0;
			for (var i in JokerArr) {
				if (this.x == JokerArr[i].x && this.y == JokerArr[i].y) {
					JokerArr.splice(i, 1);
				}
			}
		}
	}
   
}