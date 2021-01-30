

function runRiverBuilder(map) {

    // Creo rio vertical
    let riverPath = []

    let steps = 0
    let nextRow = 0
    let nextCol = getRandomInt(0, map.cols)

    riverPath.push({ row: nextRow, col: nextCol })

    while (true) {
        steps++
        if (steps > 200) {
            break
        }

        let turn = Math.floor(Math.random() * 10)
        let turn2 = Math.floor(Math.random() * 10)

        nextRow++
        if (turn2 < 3) {
            nextCol++
        } else if (turn2 < 6) {
            nextCol--
        }
        if ((nextRow > map.rows - 1) || (nextRow < 0) || (nextCol > map.cols - 1) || (nextCol < 0)) {
            break
        }
        riverPath.push({ row: nextRow, col: nextCol })
    }

    for (let tile of riverPath) {
        let t1 = map.getTile(tile.row, tile.col)
        let t2 = map.getTile(tile.row, tile.col - 1)

        if (t1) {
            t1.type = WATER
        }
        if (t2) {
            t2.type = WATER
        }
    }
}



function runForestBuilder(map) {
    let stop = 4

    for (let i=0;i<12;i++){
        let randomTile = map.getRandomTile()
        buildTree(map, randomTile, stop,0)
    }

}

// Recursive builder tree
function buildTree(map, tile, stop, total) {
    if (stop < 0) {
        return
    }
    if ((tile.type != FOREST) && (tile.type != WATER) && (!map.isShore(tile))) {
        let treeProb = getRandomInt(0, 10)
        let umbral = 2 + (Math.round(total))
        console.log(umbral)
        if (treeProb > umbral) {
            tile.type = FOREST
            total++
            stop--
            let neig = map.getNeighbour(tile)
            neig.sort(() => .5 - Math.random())
            for (let nt of neig) {
                buildTree(map, nt, stop, total)
            }
        }
    }
}