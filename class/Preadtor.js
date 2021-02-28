var LivingCreature = require("./LivingCreature");



module.exports = class Preadtor extends LivingCreature {
    constructor(x, y, index) {
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