

/*
    Primera prueba con el automata de:
    https://www.davideaversa.it/blog/random-maps-with-cellular-automata/

    Para esta implementación FOREST_AMOUNT debe variar entre el 20 y el 40 no más de ahí
    Como primera aproximación no está mal. ahora deberia limpiar un poco más para no 
    dejar tanta pared aislada

*/



let FOREST_AMOUNT = 40


function runCellular(map){
    for (var col = 0; col < map.cols; col++) {
        for (var row = 0; row < map.rows; row++) {
            map.grid[col][row].type = cellularAutomata(map, row, col, true)
        }
    }
}


// Implementación del autómata celular y sus reglas de fusionado
function cellularAutomata(map, r, c,clean) {

    var numWalls = countAround(map, r, c, 1, 1);
    var numWalls2 = countAround(map, r, c, 2, 2);

    if (map.isWall(r, c)) { 
        if (numWalls >= 3) {
            return FOREST;
        }
        return GRASS;
    }
    else {
        if (!clean) {
            if (numWalls >= 5 || numWalls2 <= 2) {
                return FOREST;
            }
        } else {
            if (numWalls >= 5) {
                return FOREST;
            }
        }
    }
    return GRASS;
}




function countAround(map, r, c, scope_x, scope_y) {

    var startX = c - scope_x;
    var startY = r - scope_y;
    var endX = c + scope_x;
    var endY = r + scope_y;

    var wallCounter = 0;

    for (var iY = startY; iY <= endY; iY++) {
        for (var iX = startX; iX <= endX; iX++) {
            if (!(iX == c && iY == r)) {
                if (map.isWall(iY, iX)) {
                    wallCounter += 1;
                }
            }
        }
    }
    return wallCounter;
}
