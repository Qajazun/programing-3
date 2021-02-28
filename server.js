var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

// ... ավելացնել կերպարների require-ները
Grass = require("./class/Grass.js")
GrassEater = require("./class/GrassEater.js")
Preadtor = require("./class/Preadtor.js")
Bomber = require("./class/Bomber.js")
Lava = require("./class/Lava.js")
Lava_source = require("./class/Lava_source.js")

var weather = 'winter';
var stats = [];



 var counter_grass = 5;
 var counter_grassEater = 5;
 var counter_wolf = 2;
 var counter_BomberMan = 1;




grassArr = [];
grassEaterArr = [];
wolfArr = [];
BomberManArr = [];
Lava_sourceArr = [];
LavaArr = [];



// ... ավելացնել մնացած կերպարների զանգվածները

app.use(express.static("."));

app.get('/', function (req, res) {
	res.redirect('index.html');
});

server.listen(3000);

// Աշխատում է, երբ նոր socket է միանում սերվերին
io.on('connection', function (socket) {
	console.log('a user connected');

	// Լսել socket-ի someEvent թարմացումներին և 
	// ներսում աշխատեղնել անհրաժեշտ կոդը
	socket.on('someEvent', function () {
		console.log('some event happened on server');
		// ... ավելացնել լոգիկան թե մատրիցայում ինչ է տեղի ունենում ինչ որ իրադարձության ժամանակ	
	});

	// Աշխատում է, երբ միացված socket-ը անջատվում է սերվերից
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});


Random = function  (arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}


// talis e patahakan tiv min-ic minchev max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function genMatrix(w, h) {
	var matrix = [];
	for (var y = 0; y < h; y++) {
		matrix[y] = [];
		for (var x = 0; x < w; x++) {
			matrix[y].push(0);
		}
	}
	while (counter_grass > 0) {
		var y = random(0,h-1);
		var x = random(0,w-1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 1;
			counter_grass--;
		}
	
	}
	while (counter_grassEater > 0) {
		var y = random(0,h-1);
		var x = random(0,w-1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 2;
			counter_grassEater--;
		}
	
	}
	while (counter_wolf> 0) {
		var y = random(0,h-1);
		var x = random(0,w-1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 3;
			counter_wolf--;
		}

	
	}
	while (counter_BomberMan > 0) {
		var y = random(0,h-1);
		var x = random(0,w-1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 4;
			counter_BomberMan--;
		}
	}
	while (counter_wolf > 0) {
		var y = random(0,h-1);
		var x = random(0,w-1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 5;
			counter_wolf--;
		}
	}
	

	return matrix;
}   

// sarkum e generacvac matrix-y
matrix = genMatrix(20,20); 





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

	// ... ավելացնել matrixGenerator ֆունկցիայի կոդը


function start() {
	





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

	// ... ավելացնել կերպարների օբյեկտները ստեղծելու լոգիկան 
	// նախկինում setup ֆունկցիայում գրված
}

function game() {
	// ... ավելացնել խաղի լոգիկան նախկինում draw ֆունկցիայում գրված
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
	// Ստեղծել data օբյեկտը և նրա մեջ պահել այն տվյալները,
	// որոնք պետք է ուղարկել socket-ով
	var data = {
		'matrix': matrix,
		'weater': weather
	};

	// Ասել socket-ին որ տեղի ունեցավ matrixUpdate իրադարձությունը և
	// ուղարկում է data օբյեկտը
	io.sockets.emit('matrixUpdate', data);

	saveStats();


// Կերպարների զանգվածներում առկա օբյեկտների քանակի հիման վրա ստեղծում է
// նոր ստատիստիկա և այն ավելացնում ստատիստիկայի գլոբալ փոփոխականի մեջ և
// այն ամբողջական տվյալները պահպանում է ֆայլում
function saveStats() {
    var fileName = 'stats.json';
	var statsObject = {
		'grassCount': grassArr.length,
		'grassEaterCount': grassEaterArr.length,
		'predatorCount': wolfArr.length
		// ... ավելացնել մնացած կերպարների տվյալները
	};

    stats.push(statsObject);
    fs.writeFileSync(fileName, JSON.stringify(stats, null, 4));
}

// Կանչել start ֆունկցիան ծրագրի աշխատանքի սկզբում 1 անգամ
start();

// Ստեղծել ինտերվալ, որ game ֆունկցիան կանչվի պարբերաբար
setInterval(game, 1000);
