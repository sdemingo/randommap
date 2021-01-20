

/*
    mapa de alturas
*/




function runHeightMap(map){
    noise.seed(Math.random())
    for (var col = 0; col < map.cols; col++) {
        for (var row = 0; row < map.rows; row++) {
            map.grid[col][row].height = Math.abs(noise.perlin2(col/100,row/100)) * 100

            if (map.grid[col][row].height < 5){
                map.grid[col][row].type = WATER
            }
            if (map.grid[col][row].height >= 5){
                map.grid[col][row].type = SAND
            }

            if (map.grid[col][row].height >= 7){
                map.grid[col][row].type = GRASS
            }

            if (map.grid[col][row].height >= 20){
                map.grid[col][row].type = FOREST
            }

            if (map.grid[col][row].height >= 40){
                map.grid[col][row].type = MOUNTAIN
            }

            if (map.grid[col][row].height >= 60){
                map.grid[col][row].type = SNOW
            }
        }
    }
}