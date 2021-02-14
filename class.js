class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
		this.newDirections()
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];

			if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}
			}

		}
		return found;
	}
}
    


class Grass extends LivingCreature {
    constructor(x, y, index){
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
class GrassEater extends LivingCreature {
    constructor(x, y, index){
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
class Preadtor extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index)
        this.multiply = 0;
		this.bazm = 0;
		this.aragucrun = 0;


		this.tact_move = 4;

		this.tact_die = 6;
		this.tact_mul = 6;
	}
	newDirections() {
		this.directions = [
			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 2],

			[this.x - 2, this.y - 1],
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x + 2, this.y - 1],

			[this.x - 2, this.y],
			[this.x - 1, this.y],
			[this.x, this.y],
			[this.x + 1, this.y],
			[this.x + 2, this.y],

			[this.x - 2, this.y + 1],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x + 2, this.y + 1],

			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x + 2, this.y + 2],
		];
	}
	chooseCell(character) {
		this.newDirections();
		return super.chooseCell(character);
	}

	move() {

		var emptyCord0 = this.chooseCell(0),
			emptyCord1 = this.chooseCell(1),

			emptyCord = emptyCord0.concat(emptyCord1),
			cord = random(emptyCord);

		if (cord) {
			var
				x = cord[0],
				y = cord[1];
			matrix[this.y][this.x] = matrix[y][x];
			matrix[y][x] = this.index;
			this.x = x;
			this.y = y;
		}
	}


	die() {
		matrix[this.y][this.x] = 0;
		for (var i in wolfArr) {
			if (this.x == wolfArr[i].x && this.y == wolfArr[i].y) {
				wolfArr.splice(i, 1);
				this.bazm = 0;
				break;
			}
		}
	}
	mul() {
		var
			emptyCord = this.chooseCell(0),
			cord = random(emptyCord);
		if (cord) {
			var
				x = cord[0],
				y = cord[1];
			var eater = new preadtor(x, y, this.index, this.tact);
			wolfArr.push(eater);
			matrix[this.y][this.x] = matrix[y][x];
			matrix[y][x] = this.index;
			this.multiply = 0;
		}
	}

	eat() {
		var emptyCord = this.chooseCell(2),

			cord = random(emptyCord);





		this.aragucrun++;
		if (this.aragucrun >= this.tact_move) {
			this.aragucrun = 0;

			if (cord) {
				var x = cord[0],
					y = cord[1];

				matrix[y][x] = this.index;
				matrix[this.y][this.x] = 0;


				for (var i in grassEaterArr) {
					if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
						grassEaterArr.splice(i, 1);
						this.multiply++;
						if (this.multiply == this.tact_mul) {
							this.mul();

							this.bazm = 0;
						}
						break;
					}
				}
				this.x = x;
				this.y = y;


			} else {
				this.move();
				this.bazm++;
				if (this.bazm == this.tact_die) {
					this.die(this.x, this.y);
				}
			}
		}
	}

}
class Bomber extends LivingCreature {
    constructor(x, y, index){
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















class Lava_source {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
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
	chooseCell() {
		this.newDirections()
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];

			if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == 0) {
					found.push(this.directions[i]);

				} else if (matrix[y][x] == 1) {
					found.push(this.directions[i]);
					for (var b in grassArr) {
						if (this.x == grassArr[b].x && this.y == grassArr[b].y) {
							grassArr.splice(b, 1);
							break;
						}
					}
				} else if (matrix[y][x] == 2) {
					found.push(this.directions[i]);
					for (var b in grassEaterArr) {
						if (this.x == grassEaterArr[b].x && this.y == grassEaterArr[b].y) {
							grassEaterArr.splice(b, 1);
							break;
						}
					}
				} else if (matrix[y][x] == 3) {
					found.push(this.directions[i]);
					for (var b in wolfArr) {
						if (this.x == wolfArr[b].x && this.y == wolfArr[b].y) {
							wolfArr.splice(b, 1);
							break;
						}
					}
				}
			}



		}
		return found;
	}

	mul() {
		this.multiply++;
		var emptyCells = this.chooseCell();
		var newCell = random(emptyCells);
		if (newCell && this.multiply >= 25) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = 'Lava';
			var newLava = new Lava(newX, newY, 'Lava');
			LavaArr.push(newLava);
			this.multiply = 0;
		}
	}
}
class Lava {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;

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


	chooseCell() {
		this.newDirections()
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];

			if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {

				if (matrix[y][x] == 0) {
					found.push(this.directions[i]);

				} else if (matrix[y][x] == 1) {
					found.push(this.directions[i]);
					for (var b in grassArr) {
						if (this.x == grassArr[b].x && this.y == grassArr[b].y) {
							grassArr.splice(b, 1);
							break;
						}
					}
				} else if (matrix[y][x] == 2) {
					found.push(this.directions[i]);
					for (var b in grassEaterArr) {
						if (this.x == grassEaterArr[b].x && this.y == grassEaterArr[b].y) {
							grassEaterArr.splice(b, 1);
							break;
						}
					}
				} else if (matrix[y][x] == 3) {
					found.push(this.directions[i]);
					for (var b in wolfArr) {
						if (this.x == wolfArr[b].x && this.y == wolfArr[b].y) {
							wolfArr.splice(b, 1);
							break;
						}
					}
				}
			}



		}
		return found;
	}



	mul() {

		this.multiply++;
		var emptyCells = this.chooseCell();
		var newCell = random(emptyCells);

		if (newCell && this.multiply >= 25) {

			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = this.index;
			var newLava = new Lava(newX, newY, this.index);
			LavaArr.push(newLava);
			this.multiply = 0;
		}
	}
}