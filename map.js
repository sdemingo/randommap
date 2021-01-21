

let TILE_SZ = 5

let WATER = -1
let SAND = 0
let GRASS = 1
let FOREST = 2
let MOUNTAIN = 3
let SNOW = 4

let MAX_COLS=64
let MAX_ROWS=64


function Tile(type) {
    this.type = type
    this.height = 0
}

function getColorByType(tile) {
    switch (tile.type) {
        case SAND:
            return 'brown'
        case GRASS:
            return 'green'
        case FOREST:
            return 'darkGreen'
        case WATER:
            return 'darkBlue'
        case MOUNTAIN:
            return 'grey'
        case SNOW:
            return 'silver'
    }
}

function getColorByHeight(tile) {
    return "rgba(0,0,0,"+tile.height+")"
}


Tile.prototype.render = function (ctxt, x, y, colorFunc) {
    let color = colorFunc(this)

    ctxt.beginPath()
    ctxt.rect(x * TILE_SZ, y * TILE_SZ, TILE_SZ, TILE_SZ)
    ctxt.fillStyle = color
    ctxt.fill()
    ctxt.closePath()
}





function Map(titleText) {

    let div = document.createElement("div")
    let title = document.createElement("h2")
    title.innerHTML = titleText

    this.canvas = document.createElement("canvas");
    this.ctxt = this.canvas.getContext("2d");

    this.rows = MAX_ROWS
    this.cols = MAX_COLS
    this.canvas.width = this.cols * TILE_SZ
    this.canvas.height = this.rows * TILE_SZ

    div.appendChild(title)
    div.appendChild(this.canvas)
    document.body.appendChild(div)

    this.grid = []
    for (var x = 0; x < this.cols; x++) {
        this.grid[x] = new Array()
        for (var y = 0; y < this.rows; y++) {
            if (Math.floor(Math.random() * 101 < FOREST_AMOUNT)) {
                this.grid[x][y] = new Tile(FOREST)
            } else {
                this.grid[x][y] = new Tile(GRASS)
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
    return this.grid[r][c].type == FOREST;

}


Map.prototype.render = function (colorFunc) {
    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var x = 0; x < this.cols; x++) {
        for (var y = 0; y < this.rows; y++) {
            this.grid[x][y].render(this.ctxt, x, y, colorFunc)
        }
    }
}




