

let TILE_SZ = 32

let WATER = -1
let SAND = 0
let GRASS = 1
let FOREST = 2
let MOUNTAIN = 3
let SNOW = 4

let MAX_COLS = 16
let MAX_ROWS = 16


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
    return "rgba(0,0,0," + tile.height + ")"
}


Tile.prototype.render = function (ctxt, x, y, colorFunc) {
    let color = colorFunc(this)
    ctxt.beginPath()
    ctxt.rect(x * TILE_SZ, y * TILE_SZ, TILE_SZ, TILE_SZ)
    ctxt.fillStyle = color
    ctxt.fill()
    ctxt.closePath()
}


Tile.prototype.draw = function (map, col, row,auto) {

    let mask=15
    if (auto){
        mask = getGrassSprite(map, col, row)
    }

    map.ctxt.drawImage(map.sprites[GRASS],
        0, mask * TILE_SZ,
        TILE_SZ, TILE_SZ,
        col * TILE_SZ, row * TILE_SZ,
        TILE_SZ, TILE_SZ)


    if (this.type != GRASS) {
        map.ctxt.drawImage(map.sprites[this.type], col * TILE_SZ, row * TILE_SZ)
    }
}


// Autotiling function: Tengo que afinarlo en los bordes
function getGrassSprite(map, col, row) {
    if ((col==0) || (col==map.cols-1) || (row==0) || (row==map.rows-1)){
        return 15 // es borde
    }

    let a, b, c, d
    if (row - 1 >= 0) {
        a = map.grid[col][row - 1]
    }
    if (col + 1 < map.cols) {
        b = map.grid[col + 1][row]
    }
    if (row + 1 < map.rows) {
        c = map.grid[col][row + 1]
    }
    if (col - 1 >= 0) {
        d = map.grid[col - 1][row]
    }

    let mask = 0
    if ((a) && a.type == GRASS) { mask += 1 }
    if ((b) && b.type == GRASS) { mask += 2 }
    if ((c) && c.type == GRASS) { mask += 4 }
    if ((d) && d.type == GRASS) { mask += 8 }
    
    return mask
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
            //if (Math.floor(Math.random() * 101 < FOREST_AMOUNT)) {
            //    this.grid[x][y] = new Tile(FOREST)
            //} else {
            this.grid[x][y] = new Tile(GRASS)
            //}

        }
    }


    // Cargo sprites
    let spritesLoaded = 0
    this.sprites = []
    this.sprites[WATER] = new Image()
    this.sprites[WATER].onload = function () { spritesLoaded++ }
    this.sprites[WATER].src = "sprites/water.png"

    this.sprites[GRASS] = new Image()
    this.sprites[GRASS].onload = function () { spritesLoaded++ }
    this.sprites[GRASS].src = "sprites/grass-shore.png"

    this.sprites[FOREST] = new Image()
    this.sprites[FOREST].onload = function () { spritesLoaded++ }
    this.sprites[FOREST].src = "sprites/tree.png"

    this.spritesReady = function () {
        return spritesLoaded == 3
    }
}



Map.prototype.isWall = function (r, c) {
    if (r < 0 || c < 0) {
        return true;
    }
    if (c > this.cols - 1 || r > this.rows - 1) {
        return true;
    }
    return this.grid[c][r].type == FOREST;

}


Map.prototype.render = function (autoTiling=true) {
    if (!this.spritesReady()) {
        console.log("Sprites no cargados aun")
        return
    }

    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var col = 0; col < this.cols; col++) {
        for (var row = 0; row < this.rows; row++) {
            //this.grid[x][y].render(this.ctxt, x, y, colorFunc)
            this.grid[col][row].draw(this, col, row, autoTiling)
        }
    }
}




