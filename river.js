

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function runRiverBuilder(map) {

    // Creo rio vertical
    let riverPath = []

    let steps = 0

    let nextRow = 0
    let nextCol = getRandomInt(5, map.cols - 5)

    console.log({ row: nextRow, col: nextCol })
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
        }else if (turn2 < 6){
            nextCol--
        }


        if ((nextRow > map.rows - 1) || (nextRow < 0) || (nextCol > map.cols - 1) || (nextCol < 0)) {
            break
        }
        riverPath.push({ row: nextRow, col: nextCol })
    }

 
    for (let tile of riverPath) {
        if (map.grid[tile.col][tile.row]) {
            map.grid[tile.col][tile.row].type = WATER
        }
        if (map.grid[tile.col - 1][tile.row]) {
            map.grid[tile.col - 1][tile.row].type = WATER
        }
    }
}