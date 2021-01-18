

var TILE_SZ = 10

WATER = -1
GRASS = 0
FOREST = 1

function Game(parent) {

    this.canvas = document.createElement("canvas");
    this.ctxt = this.canvas.getContext("2d");

    this.rows = 50
    this.cols = 50
    this.canvas.width = this.cols * TILE_SZ
    this.canvas.height = this.rows * TILE_SZ

    parent.appendChild(this.canvas);

    this.grid = []

    // inicialize grid
    for (var x = 0; x < this.cols; x++) {
        this.grid[x] = new Array()
        for (var y = 0; y < this.rows; y++) {
            this.grid[x][y] = GRASS
        }
    }

    // set random forest center
    for (var x = 0; x < this.cols; x++) {
        for (var y = 0; y < this.rows; y++) {
            if (Math.random() < 0.35) {
                this.grid[x][y] = FOREST
            }
        }
    }

    // merge
    for (var x = 0; x < this.cols; x++) {
        for (var y = 0; y < this.rows; y++) {
            if (lookForInAdjacent(this.grid, x, y, GRASS) >= 5) {
                this.grid[x][y] = GRASS
            } else {
                this.grid[x][y] = FOREST

            }
        }
    }

    // build river. vamos relleando baldosas del rio desde
    // la posición inicial que estára siempre en el borde superior
    // el rio finaliza cuando se supera algun borde

    rX = 20   // deberia ser random
    rY = 0
    this.grid[rX][rY] = WATER

    console.log(randNumber(-1, 1))
    while (true) {
        // calculamos la siguiente baldosa de agua
        rX = rX + randNumber(-1, 1)
        rY = rY + randNumber(-1, 1)
        if (rX < 0 || rX > this.cols || rY < 0 || rY > this.rows) {
            break
        }
        this.grid[rX][rY] = WATER
    }





    // Buscar la suma de los vecinos de cada arbol y si suman mas de tanto entonces es arbol y si no no
    function lookForInAdjacent(grid, col, row, type) {
        found = 0
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if ((grid[col + i] != undefined) && (grid[col + i][row + j] == type)) {
                    found++
                }
            }
        }
        return found
    }



}





Game.prototype.render = function () {

    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var x = 0; x < this.cols; x++) {
        for (var y = 0; y < this.rows; y++) {
            if (this.grid[x][y] == GRASS) {
                drawRectangule(this.ctxt, x * TILE_SZ, y * TILE_SZ, 'green')
            }
            if (this.grid[x][y] == FOREST) {
                drawRectangule(this.ctxt, x * TILE_SZ, y * TILE_SZ, 'darkGreen')
            }
            if (this.grid[x][y] == WATER) {
                drawRectangule(this.ctxt, x * TILE_SZ, y * TILE_SZ, 'darkBlue')
            }
        }
    }
}



var world

window.onload = function () {

    var parent = document.body
    // create new Game
    world = new Game(parent)

    world.render()
}





function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function drawRectangule(cx, x, y, color) {
    cx.beginPath();
    cx.rect(x, y, TILE_SZ, TILE_SZ);
    cx.fillStyle = color;
    cx.fill();
    cx.lineWidth = 1;
    //cx.strokeStyle = 'black';
    //cx.stroke();
}

