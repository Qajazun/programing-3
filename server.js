var express = require('express');
var app = express();
var server = require('http').createServer(app);
io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
	res.redirect('index.html');
});

server.listen(3000);

Random = function (arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}


// talis e patahakan tiv min-ic minchev max
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// kanchum e modulnery
weath = "winter";
Grass = require("./class/Grass.js");
GrassEater = require("./class/GrassEater");
Predator = require("./class/Predator");
Joker = require("./class/Joker");
Wolf = require("./class/Wolf");




// kerparneri qanaknery
var count_grass = 1;
var count_grassEater = 7;
var count_predator = 4;
var count_Joker = 10;
var count_wolf = 10;

// zangvacner classneri hamar
grassArr = []
grasseaterArr = []
predatorArr = []
JokerArr = []
wolfArr = []

// generacvum e matrix-y
function genMatrix(w, h) {
	var matrix = [];
	for (var y = 0; y < h; y++) {
		matrix[y] = [];
		for (var x = 0; x < w; x++) {
			matrix[y].push(0);
		}
	}
	while (count_grass > 0) {
		var y = rand(0, h - 1);
		var x = rand(0, w - 1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 1;
			count_grass--;
		}

	}
	while (count_grassEater > 0) {
		var y = rand(0, h - 1);
		var x = rand(0, w - 1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 2;
			count_grassEater--;
		}

	}
	while (count_predator > 0) {
		var y = rand(0, h - 1);
		var x = rand(0, w - 1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 3;
			count_predator--;
		}


	}
	while (count_Joker > 0) {
		var y = rand(0, h - 1);
		var x = rand(0, w - 1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 4;
			count_Joker--;
		}
	}
	while (count_wolf > 0) {
		var y = rand(0, h - 1);
		var x = rand(0, w - 1);
		if (matrix[y][x] == 0) {
			matrix[y][x] = 5;
			count_wolf--;
		}
	}


	return matrix;
}

// sarkum e generacvac matrix-y
matrix = genMatrix(20, 20);

function createObject() {
	// sarkum e skzbnakan classner-y
	for (var y = 0; y < matrix.length; ++y) {
		for (var x = 0; x < matrix[y].length; ++x) {
			var obj = matrix[y][x]
			if (obj == 1) {
				var gr = new Grass(x, y, 1);
				grassArr.push(gr);
			}
			else if (obj == 2) {
				var ge = new GrassEater(x, y, 2)
				grasseaterArr.push(ge);

			} else if (obj == 3) {
				var pe = new Predator(x, y, 3)
				predatorArr.push(pe);

			}
			else if (obj == 4) {
				var jok = new Joker(x, y, 4)
				JokerArr.push(jok);
			}
			else if (obj == 5) {
				var wol = new Wolf(x, y, 5)
				wolfArr.push(wol);
			}
		}
	}
}

// misht krknvum e
function interval() {
	// amen ankam popoxum e classner-y
	for (var i in grassArr) {
		grassArr[i].mul();
	}
	for (var i in grasseaterArr) {
		grasseaterArr[i].move();
		grasseaterArr[i].eat();
		grasseaterArr[i].mul();
		grasseaterArr[i].die();
	}
	for (var i in predatorArr) {
		predatorArr[i].move();
		predatorArr[i].eat();
		predatorArr[i].mul();
		predatorArr[i].die();
	}

	for (var i in JokerArr) {
		JokerArr[i].move();
		JokerArr[i].eat();
		JokerArr[i].mul();
		JokerArr[i].die();
	}
	for (var i in wolfArr) {
		wolfArr[i].move();
		wolfArr[i].eat();
		wolfArr[i].mul();
		wolfArr[i].die();
	}
	io.sockets.emit("matrix", matrix);

}

// misht krknvum e 1 varkian-y mek
setInterval(interval, 1000);




function kill() {
	grassArr = [];
	grassEaterArr = [];


	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			matrix[y][x] = 0;
		}
	}
	io.sockets.emit("send matrix", matrix);
}


function addGrass() {
	for (var i = 0; i < 7; i++) {
		var x = Math.floor(Math.random() * matrix[0].length)
		var y = Math.floor(Math.random() * matrix.length)
		if (matrix[y][x] == 0) {
			matrix[y][x] = 1
			var gr = new Grass(x, y, 1)
			grassArr.push(gr)
		}
	}
	io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
	for (var i = 0; i < 7; i++) {
		var x = Math.floor(Math.random() * matrix[0].length)
		var y = Math.floor(Math.random() * matrix.length)
		if (matrix[y][x] == 0) {
			matrix[y][x] = 2
			grasseaterArr.push(new GrassEater(x, y, 2))
		}

	}
	io.sockets.emit("send matrix", matrix);

}
function addPredator() {
	for (var i = 0; i < 7; i++) {
		var x = Math.floor(Math.random() * matrix[0].length)
		var y = Math.floor(Math.random() * matrix.length)
		if (matrix[y][x] == 0) {
			matrix[y][x] = 3
			predatorArr.push(new Predator(x, y, 3))
		}

	}
	io.sockets.emit("send matrix", matrix);

}

function weather() {
	if (weath == "winter") {
		weath = "spring"
	}
	else if (weath == "spring") {
		weath = "summer"
	}
	else if (weath == "summer") {
		weath = "autumn"
	}
	else if (weath == "autumn") {
		weath = "winter"
	}
	io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);








io.on('connection', function (socket) {
	createObject();
	socket.on("kill", kill);
	socket.on("add grass", addGrass);
	socket.on("add grassEater", addGrassEater);
	socket.on("add predator", addPredator);

});


var statistics = {};

setInterval(function () {
	statistics.grass = grassArr.length;
	statistics.grassEater = grasseaterArr.length;

	fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
		console.log("send")
	})
}, 1000)
