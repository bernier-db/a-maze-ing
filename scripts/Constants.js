const CTX = document.getElementById("canvas").getContext("2d");
const MAZE_H = 25;
const MAZE_W = 25;

const CANVAS_W = 800;
const CANVAS_H = 600;

const TILESET_ROW = 10;
const TILESET_COL = 12;
const TILE_H = 48;
const TILE_SURFACE_H = 32;
const TILE_W = 64;
const DRAW_TILE_W = 32;
const DRAW_TILE_H = 24;      
const DRAW_TILE_SURFACE_H = 16;
const WALKABLE_POS = 2;
const WALL_POS = 1;

const TWO_PI = Math.PI*2;


function isometricToScreen(x, y){
    var _x = (x - y) * DRAW_TILE_W/2;
    var _y = (x + y) * DRAW_TILE_SURFACE_H/2;
    return {x:_x, y:_y};
}

function screenToIsometric(x, y){
   var _x = (x / (DRAW_TILE_W/2) + y / (DRAW_TILE_SURFACE_H/2)) /2;
var _y = (y / (DRAW_TILE_SURFACE_H/2) - x / (DRAW_TILE_W/2)) /2;
    return {x: _x, y: _y}
}