
let MAX_ROOMS = 5


const MIN_ROOM_WIDTH = 5
const MIN_ROOM_HEIGHT = 5

function runDungeonBuilder(map) {
    // Create first space
    let root = new Space(0, 0, map.cols - 1, map.rows - 1)

    let c = 0
    divideSpace(map, root, c)
    drawSpaces(map, root)
    //drawCorridors(map, root)
}


function divideSpace(map, room, count) {
    if (count > MAX_ROOMS) {
        return
    } else {
        let childs = room.split()
        if (!childs) {
            return
        }

        if (childs[0].validSpace() && childs[1].validSpace()) {
            count += 2
            childs[0].parent = room
            childs[1].parent = room

            room.children = childs

            divideSpace(map, childs[1], count)
            divideSpace(map, childs[0], count)
        }
    }
}

// Dibujo habitación. Una habitación siempre será una hoja del árbol
// de espacios.
function drawSpaces(map, room) {
    if (!room) {
        return
    }
    if (room.children.length == 0) {
        room.insertToMap(map)
    }
    drawSpaces(map, room.children[0])
    drawSpaces(map, room.children[1])
}


function drawCorridors(map, room) {
    if (!room) {
        return
    }

    if (room.children[0] && room.children[1]) {
        //&& (room.children[0].children.length == 0) 
        //&& (room.children[1].children.length == 0)) {

        drawDoor(map, room.children[0], room.children[1])

        drawCorridors(map, room.children[0])
        drawCorridors(map, room.children[1])
    }

}


// Dibujo un pasillo. Un pasillo siempre será un espacio que une dos 
// habitaciones hijas
function drawDoor(map, room1, room2) {
    if (!room1 || !room2) {
        return
    }
    if (room1.row == room2.row) {
        // hermanas en horizontal
        let doorRow = Math.floor(room1.height/2)
        let tile = map.getTile(doorRow, room2.col)
        tile.type = STONE_FLOOR
    }
    if (room1.col == room2.col) {
        // hermanas en vertical
        let doorCol = Math.floor(room1.width/2)
        let tile = map.getTile(room2.row, doorCol)
        tile.type = STONE_FLOOR
    }
}






function Space(col, row, width, height) {
    this.col = col          // top-left corner position
    this.row = row          // top-left corner position
    this.width = width      // cols
    this.height = height    // rows
    this.parent = null
    this.children = []
}

Space.prototype.validSpace = function () {
    return (this.width > MIN_ROOM_WIDTH) && (this.height > MIN_ROOM_WIDTH)
}

/*
Space.prototype.validSubtree = function(){
    return true
}
*/

Space.prototype.split = function () {
    let splitType

    if ((this.width >= MIN_ROOM_WIDTH) && (this.height >= MIN_ROOM_HEIGHT)) {
        splitType = getRandomInt(0, 2)
    } else {
        if ((this.width < MIN_ROOM_WIDTH) && (this.height < MIN_ROOM_HEIGHT)) {
            return
        } else {
            if (this.width < MIN_ROOM_WIDTH) {
                splitType = 0
            } else {
                splitType = 1
            }
        }
    }

    if (splitType) { // partición vertical
        let splitCol = getRandomInt(2, this.width - 2)
        let s1 = new Space(this.col, this.row, splitCol, this.height)
        let s2 = new Space(this.col + (splitCol), this.row, this.width - (splitCol), this.height)
        return [s1, s2]
    } else {        // partición horizontal
        let splitRow = getRandomInt(2, this.height - 2)
        let s1 = new Space(this.col, this.row, this.width, splitRow)
        let s2 = new Space(this.col, this.row + (splitRow), this.width, this.height - (splitRow))
        return [s1, s2]
    }
}

/*
Space.prototype.insertToMap = function (map) {
    for (let c = 0; c <= this.width; c++) {
        for (let r = 0; r <= this.height; r++) {
            let tile = map.getTile(this.row + r, this.col + c)
            //console.log(tile)
            if (tile) {
                if ((c == 0) || (r == 0) || (c == this.width) || (r == this.height)) {
                    tile.type = STONE_WALL
                } else {
                    tile.type = STONE_FLOOR
                }
            }
        }
    }
}*/

// Crea una habitación a partir de un espacio dado. Una habitación básicamente
// es un espacio al que definimos un "padding" o relleno hacia adentro del espacio
Space.prototype.makeRoom = function(map){
    let randPadding = getRandomInt(1, Math.min(this.width,this.height)-1)
    for (let c = randPadding; c <= this.width - randPadding; c++) {
        for (let r = randPadding; r <= this.height - randPadding; r++) {
            let tile = map.getTile(this.row + r, this.col + c)
            //console.log(tile)
            if (tile) {
                if ((c == 0) || (r == 0) || (c == this.width) || (r == this.height)) {
                    tile.type = STONE_WALL
                } else {
                    tile.type = STONE_FLOOR
                }
            }
        }
    }
}