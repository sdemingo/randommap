

/*
    mapa de alturas
*/


function distanceToTheCenter(map, col, row) {
    /*let mapWitdh=map.cols * TILE_SZ
    let mapHeight=map.rows * TILE_SZ

    let centerX = Math.floor(mapWitdh/2)
    let centerY = Math.floor(mapHeight/2)

    let x=col*TILE_SZ
    let y=row*TILE_SZ

    let distX = (centerX - x) * (centerY - x)
    let distY = (centerY - y) * (centerY - y)

    return Math.sqrt(distX+distY)*/

    let x = col * TILE_SZ
    let y = row * TILE_SZ
    let island_size = map.cols

    let distance_x = Math.abs(x - island_size * 0.5);
    let distance_y = Math.abs(y - island_size * 0.5);
    return Math.sqrt(distance_x * distance_x + distance_y * distance_y); // circular mask

}

function runHeightMap(map) {
    noise.seed(Math.random())
    for (var col = 0; col < map.cols; col++) {
        for (var row = 0; row < map.rows; row++) {
            // 
            let h = noise.perlin2(col / 50, row / 50)
            let tile = map.getTile(row,col)
            tile.height = h
        }
    }
}