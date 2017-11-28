var CANVAS_W = window.innerWidth;
var CANVAS_H = window.innerHeight;
var canvas = document.getElementById("canvas");
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
const CTX = canvas.getContext("2d");

var DEBUG = false;

const MAZE_H = 35;
const MAZE_W = MAZE_H;



const nbBoids = MAZE_H*1.5;

const TILESET_ROW = 10;
const TILESET_COL = 12;
const TILE_H = 48;
const TILE_SURFACE_H = 32;
const TILE_W = 64;

var DRAW_TILE_W = CANVAS_W / MAZE_W;
var DRAW_TILE_H = DRAW_TILE_W * TILE_H / TILE_W;

var DRAW_TILE_SURFACE_H = DRAW_TILE_W / 2;
var WALKABLE_POS = 2;
var WALL_POS = 1;

const TWO_PI = Math.PI * 2;

window.onresize = function () {
    CANVAS_W = window.innerWidth;
    CANVAS_H = window.innerHeight;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    DRAW_TILE_W = (CANVAS_W / MAZE_W);
    DRAW_TILE_H = (DRAW_TILE_W * TILE_H / TILE_W);
    DRAW_TILE_SURFACE_H = (DRAW_TILE_W / 2);
}

function isometricToScreen(x, y) {
    var _x = (x - y) * DRAW_TILE_W / 2;
    var _y = (x + y) * DRAW_TILE_SURFACE_H / 2;
    return {
        x: _x,
        y: _y
    };
}

function screenToIsometric(x, y) {
    var _x = (x / (DRAW_TILE_W / 2) + y / (DRAW_TILE_SURFACE_H / 2)) / 2;
    var _y = (y / (DRAW_TILE_SURFACE_H / 2) - x / (DRAW_TILE_W / 2)) / 2;
    return {
        x: _x,
        y: _y
    }
}
