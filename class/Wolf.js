
let LivingCreature = require('./LivingCreature')

module.exports = class Wolf extends LivingCreature{ 
	constructor(x, y, index) {
		super(x,y,index);
		this.energy = 5;
		
		this.directions = [];
	  }
	getNewCoordinates(){
		this.directions = [
		 [this.x - 1, this.y - 1],
		 [this.x    , this.y - 1],
		 [this.x + 1, this.y - 1],
		 [this.x - 1, this.y    ],
		 [this.x + 1, this.y    ],
		 [this.x - 1, this.y + 1],
		 [this.x    , this.y + 1],
		 [this.x + 1, this.y + 1],
		 [this.x - 2, this.y - 2],
		 [this.x    , this.y - 2],
		 [this.x + 2, this.y - 2],
		 [this.x - 2, this.y    ],
		 [this.x + 2, this.y    ],
		 [this.x - 2, this.y + 2],
		 [this.x    , this.y + 2],
		 [this.x + 2, this.y + 2],

	
		]
	}

 

	move() {

		var emptyCells0 = this.chooseCell(0);
		var emptyCells1 = this.chooseCell(1);
		emptyCells0.concat(emptyCells1);


		let newCell = Random(emptyCells0);

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
					if(matrix[newY][newX] == 0){
						matrix[this.y][this.x] = 0;
						matrix[newY][newX] = this.inde
					}
			this.x = newX;
			this.y = newY;
			this.energy--;

		 }
		
	 }
	eat() {
		let emptyCells4 = this.chooseCell(4);
		let emptyCells2 = this.chooseCell(2);
		let emptyCells = emptyCells4.concat(emptyCells2);
		let Joker = Random(emptyCells);



		

		if(Joker){
			let newX = Joker[0];
			let newY = Joker[1];

			matrix[newY][newX] = this.index;
			matrix[this.y][this.x] = 0;

			for(let i in JokerArr) {
				if(newX === JokerArr[i].x && newY === JokerArr[i].y) {
					JokerArr.splice(i,1);
					break;
				 }
			 }

			for(let i in grasseaterArr) {
				if(newX === grasseaterArr[i].x && newY === grasseaterArr[i].y) {
					grasseaterArr.splice(i,1);
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
			matrix[y][x] = 5	
			var newwolf = new Wolf(x,y,5);
			wolfArr.push(newwolf);
			this.energy = 5;
		 }
	 }
	die() {
		if (this.energy <= 0) {
			matrix[this.y][this.x] = 0;
			for (var i in wolfArr) {
				if (this.x == wolfArr[i].x && this.y == wolfArr[i].y) {
					wolfArr.splice(i, 1);
				 }
			 }
		 }
	 }
   
}