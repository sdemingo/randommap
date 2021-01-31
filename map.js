
let WATER = -1
let GRASS = 1
let FOREST = 2
let MOUNTAIN = 3
let SNOW = 4


function Tile(row, col, type) {
    this.row = row
    this.col = col
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

Tile.prototype.setTileTypeByHeight = function(h){
    this.height=h
}


Tile.prototype.draw = function (map, auto) {
    let mask = 15
    if (auto) {
        mask = getGrassSprite(map, this.col, this.row)
    }
    map.ctxt.drawImage(map.sprites[GRASS],
        0, mask * map.tileSize,
        map.tileSize, map.tileSize,
        this.col * map.tileSize, this.row * map.tileSize,
        map.tileSize,map.tileSize)

    if (this.type != GRASS) {
        map.ctxt.drawImage(map.sprites[this.type], this.col * map.tileSize, this.row * map.tileSize)
    }
}


function getGrassSprite(map, col, row) {
    let a = map.getTileType(map.getTile(row - 1, col))
    let b = map.getTileType(map.getTile(row, col + 1))
    let c = map.getTileType(map.getTile(row + 1, col))
    let d = map.getTileType(map.getTile(row, col - 1))

    let mask = 0
    if (a != WATER) { mask += 1 }
    if (b != WATER) { mask += 2 }
    if (c != WATER) { mask += 4 }
    if (d != WATER) { mask += 8 }

    return mask
}





function Map(titleText,width,height,tileSz) {

    let div = document.createElement("div")
    let title = document.createElement("h2")
    title.innerHTML = titleText

    this.canvas = document.createElement("canvas");
    this.ctxt = this.canvas.getContext("2d");

    // this.rows = MAX_ROWS
    // this.cols = MAX_COLS
    this.rows = height
    this.cols = width
    this.tileSize = tileSz
    this.canvas.width = this.cols * this.tileSize
    this.canvas.height = this.rows * this.tileSize

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
            this.grid[x][y] = new Tile(y, x, GRASS)
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

Map.prototype.isShore = function (tile) {
    for (let c = tile.col - 1; c <= tile.col + 1; c++) {
        for (let r = tile.row - 1; r <= tile.row + 1; r++) {
            let t = this.getTile(r, c)
            if (t && (t.type == WATER)) {
                return true
            }
        }
    }
    return false
}

Map.prototype.getTileType = function (tile) {
    if (!tile) {
        return GRASS
    }

    return tile.type
}


Map.prototype.render = function (autoTiling = true) {
    if (!this.spritesReady()) {
        console.log("Sprites no cargados aun")
        return
    }

    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var col = 0; col < this.cols; col++) {
        for (var row = 0; row < this.rows; row++) {
            this.grid[col][row].draw(this, autoTiling)
        }
    }
}

Map.prototype.getTile = function (row, col) {
    if ((row < 0) || (col < 0) || (row >= this.rows) || (col >= this.cols)) {
        return null
    }
    return this.grid[col][row]
}

Map.prototype.getNeighbour = function (tile) {
    let n = []
    for (let c = tile.col - 1; c <= tile.col + 1; c++) {
        for (let r = tile.row - 1; r <= tile.row + 1; r++) {
            let tile = this.getTile(r, c)
            if (tile) {
                n.push(tile)
            }
        }
    }
    return n
}

Map.prototype.getRandomTile = function () {
    let rrow = getRandomInt(0, this.rows - 1)
    let rcol = getRandomInt(0, this.cols - 1)
    return this.getTile(rrow, rcol)
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


