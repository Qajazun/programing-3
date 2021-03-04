var socket = io();

var side = 30
var weath;
// sarkum e canvas
function setup() {
  createCanvas(20 * side, 20 * side);
  background('#acacac');
}

socket.on("weather", function (data) {
  weath = data;
  console.log();

})
// nerkum e obeknery
function drawMatrix(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      var obj = matrix[x][y];

      if (obj == 0) {
        fill("gray");
        rect(x * side, y * side, side, side);
      }
      else if (obj == 1) {
        if (weath == "summer") {
          fill("green");
        } else if (weath == "autumn") {
          fill("#333300");
        } else if (weath == "winter") {
          fill("white");
        } else if (weath == "spring") {
          fill("#4dffa6");
        } else {
          fill("green")
        }

        rect(x * side, y * side, side, side);
      }
      else if (obj == 2) {
        fill("yellow");
        rect(x * side, y * side, side, side);

      } else if (obj == 3) {
        fill("red");
        rect(x * side, y * side, side, side);
      }

      else if (obj == 4) {
        fill("black");
        rect(x * side, y * side, side, side);
      }
      else if (obj == 5) {
        fill("orange");
        rect(x * side, y * side, side, side);
      }

    }
  }
}
// stanum e serveric matrix-y 
socket.on("matrix", drawMatrix);

function kill() {
  socket.emit("kill")
}

function addGrass() {
  socket.emit("add grass")
}

function addGrassEater() {
  socket.emit("add grassEater")
}

function addPredator() {
  socket.emit("add predator")
}

function addJoker() {
  socket.emit("add Joker")
}

function addWolf() {
  socket.emit("add wolf")
}

