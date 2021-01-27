

let TILE_SZ = 32

let WATER = -1
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


Tile.prototype.draw = function (map, col, row, auto) {
    let mask = 15
    if (auto) {
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


function getGrassSprite(map, col, row) {
    let a = map.getTileType(row - 1, col)
    let b = map.getTileType(row, col + 1)
    let c = map.getTileType(row + 1, col)
    let d = map.getTileType(row, col - 1)

    let mask = 0
    if (a == GRASS) { mask += 1 }
    if (b == GRASS) { mask += 2 }
    if (c == GRASS) { mask += 4 }
    if (d == GRASS) { mask += 8 }

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

Map.prototype.getTileType = function (r, c) {
    if ((r < 0) || (c < 0) || (r >= this.rows) || (c >= this.cols)) {
        return GRASS
    }
    return this.grid[c][r].type
}


Map.prototype.render = function (autoTiling = true) {
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


Map.prototype.setTileTypeByHeight = function (row, col) {
    let tile
    try {
        tile = this.grid[col][row]
    } catch (e) { }

    if (tile) {
        console.log(tile.height)
        if (tile.height > 1) {
            tile.type = FOREST
        }
    }
}



