
let MAX_ROOMS = 8


const MIN_ROOM_WIDTH = 5
const MIN_ROOM_HEIGHT = 5

function runDungeonBuilder(map) {
    // Create first space
    let root = new Space(0, 0, map.cols - 1, map.rows - 1)

    let c = 0
    divideSpace(map, root, c)
    drawSpaces(map,root)
}


function divideSpace(map, room, count) {
    if (count > MAX_ROOMS) {
        return
    } else {
        let childs = room.split()
        if (!childs){
            return
        }
        if (childs[0].validSpace()){
            room.children.push(childs[0])
            count++
            divideSpace(map, childs[0], count)
        }
        if (childs[1].validSpace()){
            room.children.push(childs[1])
            count++
            divideSpace(map, childs[1], count)
        }
    }
}

function drawSpaces(map,room){
    if (!room){
        return
    }
    if (room.children.length==0){
        room.insertToMap(map)
    }
    drawSpaces(map,room.children[0])
    drawSpaces(map,room.children[1])
    
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
            }else{
                splitType = 1
            }
        }
    }


    //let splitType = 1
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
}