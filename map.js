

let TILE_SZ = 10

let WATER = -1
let GRASS = 0
let FOREST = 1
  
let FOREST_AMOUNT = 40

/*
    Primera prueba con el automata de:
    https://www.davideaversa.it/blog/random-maps-with-cellular-automata/

    Para esta implementación FOREST_AMOUNT debe variar entre el 20 y el 40 no más de ahí
    Como primera aproximación no está mal. ahora deberia limpiar un poco más para no 
    dejar tanta pared aislada

*/
function Map(parent) {

    this.canvas = document.createElement("canvas");
    this.ctxt = this.canvas.getContext("2d");

    this.rows = 50
    this.cols = 50
    this.canvas.width = this.cols * TILE_SZ
    this.canvas.height = this.rows * TILE_SZ

    parent.appendChild(this.canvas);

    this.grid = []

    // inicialize random grid
    for (var x = 0; x < this.cols; x++) {
        this.grid[x] = new Array()
        for (var y = 0; y < this.rows; y++) {
            if (Math.floor(Math.random() * 101 < FOREST_AMOUNT)) {
                this.grid[x][y] = FOREST
            } else {
                this.grid[x][y] = GRASS
            }

        }
    }
}

Map.prototype.isWall = function (r, c) {
    if (r < 0 || c < 0) {
        return true;
    }
    if (c > this.cols - 1 || r > this.rows - 1) {
        return true;
    }
    return this.grid[r][c] == FOREST;

}

// Inicia el automata para hacer el filtrado
Map.prototype.merge = function () {
    for (var col = 0; col < this.cols; col++) {
        for (var row = 0; row < this.rows; row++) {
            this.grid[col][row] = cellularAutomata(this, row, col,true)
        }
    }
}


Map.prototype.render = function () {
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

// Implementación del autómata celular y sus reglas de fusionado
function cellularAutomata(Map, r, c,clean) {

    var numWalls = countAround(Map, r, c, 1, 1);
    var numWalls2 = countAround(Map, r, c, 2, 2);

    if (Map.isWall(r, c)) { 
        if (numWalls >= 3) {
            return FOREST;
        }
        return GRASS;
    }
    else {
        if (!clean) {
            if (numWalls >= 5 || numWalls2 <= 2) {
                return FOREST;
            }
        } else {
            if (numWalls >= 5) {
                return FOREST;
            }
        }
    }
    return GRASS;
}


function countAround(Map, r, c, scope_x, scope_y) {

    var startX = c - scope_x;
    var startY = r - scope_y;
    var endX = c + scope_x;
    var endY = r + scope_y;

    var wallCounter = 0;

    for (var iY = startY; iY <= endY; iY++) {
        for (var iX = startX; iX <= endX; iX++) {
            if (!(iX == c && iY == r)) {
                //console.log(iX)
                if (Map.isWall(iY, iX)) {
                    wallCounter += 1;
                }
            }
        }
    }
    return wallCounter;
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



/*

            CODIGO PRINCIPAL
            ================

*/

var world

window.onload = function () {
    var parent = document.body
    world = new Map(parent)
    world.merge()
    world.render()
}



/*

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/


