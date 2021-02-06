

function runDungeonBuilder(map) {
    // Create first space
    let root = new Space(1, 1, map.cols - 3, map.rows - 3)

    let childs = root.split()
    childs[0].insertToMap(map)
    childs[1].insertToMap(map)

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
    return this.width >= 5 && this.height >= 5
}

/*
Space.prototype.validSubtree = function(){
    return true
}
*/

Space.prototype.split = function () {
    let splitType = getRandomInt(0, 2) 
    if (splitType) { // partición vertical
        let splitCol = getRandomInt(0, this.width)
        let s1 = new Space(this.col, this.row, this.col + splitCol - 1, this.height)
        let s2 = new Space(this.col + splitCol + 2, this.row, this.width - splitCol - 2, this.height)
        return [s1, s2]
    } else {        // partición horizontal
        let splitRow = getRandomInt(0, this.height)
        let s1 = new Space(this.col, this.row, this.width, this.row + splitRow - 1)
        let s2 = new Space(this.col, this.row + splitRow + 2, this.width, this.height - splitRow - 2)
        return [s1, s2]
    }
}


Space.prototype.insertToMap = function (map) {
    for (let c = 0; c <= this.width; c++) {
        for (let r = 0; r <= this.height; r++) {
            let tile = map.getTile(this.row + r, this.col + c)
            //console.log(tile)
            if (tile) {
                tile.type = STONE_FLOOR
            }
        }
    }
}