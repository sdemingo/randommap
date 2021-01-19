

let TILE_SZ = 10

let WATER = -1
let GRASS = 0
let FOREST = 1



function Tile(type) {
    this.type = type
    this.height = 0
}

function getColorByType(tile) {
    switch (tile.type) {
        case GRASS:
            return 'green'
        case FOREST:
            return 'darkGreen'
        case WATER:
            return 'darkBlue'
    }
}

function getColorByHeight(tile) {
    let i=Math.abs(tile.height) * 256
    return "rgb("+i+","+i+","+i+")"
}


Tile.prototype.render = function (ctxt, x, y, colorFunc) {
    let color =  colorFunc(this)
    console.log(color)
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

    this.rows = 50
    this.cols = 50
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




