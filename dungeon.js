
let MAX_ROOMS = 8


function runDungeonBuilder(map) {
    // Create first space
    let root = new Space(0, 0, map.cols - 1, map.rows - 1)

    // let childs = root.split()
    // childs[0].insertToMap(map)
    // childs[1].insertToMap(map)

    // let niet = childs[1].split()
    // niet[0].insertToMap(map)
    // niet[1].insertToMap(map)

    let c = 0
    divideSpace(map, root, c)
}

function divideSpace(map, room, count) {
    if (count > MAX_ROOMS) {
        return
    } else {
        let childs = room.split()
        childs[0].insertToMap(map)
        childs[1].insertToMap(map)
        count+=2
        if (childs[0].validSpace()){
            divideSpace(map, childs[0], count)
        }
        if (childs[1].validSpace()){
            divideSpace(map, childs[1], count)
        }
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
    return (this.width > 10) && (this.height > 10)
}

/*
Space.prototype.validSubtree = function(){
    return true
}
*/

Space.prototype.split = function () {
    let splitType = getRandomInt(0, 2)
    //let splitType = 1
    if (splitType) { // partición vertical
        let splitCol = getRandomInt(4, this.width-4)
        let s1 = new Space(this.col, this.row, splitCol, this.height)
        let s2 = new Space(this.col + (splitCol ), this.row, this.width - (splitCol ), this.height)
        return [s1, s2]
    } else {        // partición horizontal
        let splitRow = getRandomInt(4, this.height-4)
        let s1 = new Space(this.col, this.row, this.width, splitRow)
        let s2 = new Space(this.col, this.row + (splitRow ), this.width, this.height - (splitRow ))
        return [s1, s2]
    }
}


Space.prototype.insertToMap = function (map) {
    for (let c = 0; c <= this.width; c++) {
        for (let r = 0; r <= this.height; r++) {
            let tile = map.getTile(this.row + r, this.col + c)
            //console.log(tile)
            if (tile){
                if ((c == 0) || (r == 0) || (c == this.width)|| (r == this.height)){
                    tile.type = STONE_WALL
                }else{
                    tile.type = STONE_FLOOR
                }
            }
        }
    }
}