

/*
    mapa de alturas
*/




function runHeightMap(map){
    noise.seed(Math.random())
    for (var col = 0; col < map.cols; col++) {
        for (var row = 0; row < map.rows; row++) {
            map.grid[col][row].height = noise.simplex2(col/100,row/100) //-1 to 1
        }
    }
}