
function Random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



var matrix = [];


var side = 50;
var matrix_Y = 10;
var matrix_X = 10;
var counter_grass = 5;
var counter_grassEater = 5;
var counter_wolf = 2;
var counter_BomberMan = 1;





for (var y = 0; y < matrix_Y; y++) {
	matrix.push([]);
	for (var x = 0; x < matrix_X; x++) {
		matrix[y].push(0);
	}
}


var i = 0;
while (i < counter_grass) {

	NewY = Random(0, matrix_Y - 1);
	NewX = Random(0, matrix_X - 1);
	if (matrix[NewY][NewX] == 0) {
		matrix[NewY][NewX] = 1;
		counter_grass--;
	}
}

var i = 0;
while (i < counter_grassEater) {

	NewY = Random(0, matrix_Y - 1);
	NewX = Random(0, matrix_X - 1);
	if (matrix[NewY][NewX] == 0) {
		matrix[NewY][NewX] = 2;
		counter_grassEater--;
	}
}


var i = 0;
while (i < counter_wolf) {

	NewY = Random(0, matrix_Y - 1);
	NewX = Random(0, matrix_X - 1);
	if (matrix[NewY][NewX] == 0) {
		matrix[NewY][NewX] = 3;
		counter_wolf--;
	}
}
var i = 0;
while (i < counter_BomberMan) {

	NewY = Random(0, matrix_Y - 1);
	NewX = Random(0, matrix_X - 1);
	if (matrix[NewY][NewX] == 0) {
		matrix[NewY][NewX] = 4;
		counter_BomberMan--;
	}
}



var rand_pos_LavaSource = Random(0, 3);



if (rand_pos_LavaSource == 0) {
	matrix[0][matrix.length - (1 + Random(0, matrix.length - 1))] = 'LavaSource';

} else if (rand_pos_LavaSource == 1) {
	matrix[matrix.length - 1][Random(0, matrix[0].length - 1)] = 'LavaSource';

} else if (rand_pos_LavaSource == 2) {
	matrix[Random(0, matrix.length - 1)][0] = 'LavaSource';

} else if (rand_pos_LavaSource == 3) {
	matrix[Random(0, matrix.length - 1)][matrix[0].length - 1] = 'LavaSource';
}


var grassArr = [];
var grassEaterArr = [];
var wolfArr = [];
var BomberManArr = [];
var Lava_sourceArr = [];
var LavaArr = [];


function setup() {
	frameRate(5);
	createCanvas(matrix[0].length * side, matrix.length * side);
	background('#acacac');





	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				var _grass_ = new Grass(x, y, 1);
				grassArr.push(_grass_);
			}

			else if (matrix[y][x] == 2) {
				var _grassEater_ = new GrassEater(x, y, 2);
				grassEaterArr.push(_grassEater_);
			}

			else if (matrix[y][x] == 3) {
				var _Preadtor_ = new Preadtor(x, y, 3);
				wolfArr.push(_Preadtor_);
			}

			else if (matrix[y][x] == 4) {
				var _Bomber_ = new Bomber(x, y, 4);
				BomberManArr.push(_Bomber_);
			}

			else if (matrix[y][x] == 'LavaSource') {
				var _Lava_source_ = new Lava_source(x, y, 'LavaSource');
				Lava_sourceArr.push(_Lava_source_);
			}


		}
	}


}
function draw() {

	for (var i = 0; i < grassArr.length; i++) {
		grassArr[i].mul();
	}
	for (var i = 0; i < grassEaterArr.length; i++) {
		grassEaterArr[i].eat();
	}
	for (var i = 0; i < wolfArr.length; i++) {
		wolfArr[i].eat();
	}

	for (var i = 0; i < Lava_sourceArr.length; i++) {
		Lava_sourceArr[i].mul();
	}
	for (var i = 0; i < LavaArr.length; i++) {
		LavaArr[i].mul();
	}
	for (var i = 0; i < BomberManArr.length; i++) {
		BomberManArr[i].move();
	}

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				fill("green");
			}
			else if (matrix[y][x] == 2) {
				fill("yellow");
			}
			else if (matrix[y][x] == 3) {
				fill("red");
			}
			else if (matrix[y][x] == 4) {
				fill("#ffa200");
			} else if (matrix[y][x] == 'LavaSource') {
				fill('#702727');

			} else if (matrix[y][x] == 'Lava') {
				fill('pink');
			}

			else if (matrix[y][x] == 0) {
				fill("#acacac");
			}
			else { // 
				fill("#ff0095");
			}

			rect(x * side, y * side, side, side);
		}
	}
}




