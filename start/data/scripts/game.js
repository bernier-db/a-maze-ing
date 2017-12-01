var game;
var maze = [];
var mazeWidth = 25;
var mazeHeight = 25;
var tileSize = 10;
var mazeGraphics;

window.onload = function () {
    game = new Phaser.Game(810, 610, Phaser.CANVAS, "");
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

var playGame = function (game) {};

playGame.prototype = {
    create: function () {
        mazeGraphics = game.add.graphics(0, 0);
        var moves = [];
        for (var i = 0; i < mazeHeight; i++) {
            maze[i] = [];
            for (var j = 0; j < mazeWidth; j++) {
                maze[i][j] = 1;
            }
        }
        var posX = 1;
        var posY = 1;
        maze[posX][posY] = 0;
        moves.push(posY + posY * mazeWidth);
        var interval = window.setInterval(function () {

            if (moves.length) {
                console.log("a");
                var possibleDirections = "";
                if (posX + 2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1) {
                    possibleDirections += "S";
                }
                if (posX - 2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1) {
                    possibleDirections += "N";
                }
                if (posY - 2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1) {
                    possibleDirections += "W";
                }
                if (posY + 2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1) {
                    possibleDirections += "E";
                }
                if (possibleDirections) {
                    var move = game.rnd.between(0, possibleDirections.length - 1);
                    switch (possibleDirections[move]) {
                        case "N":
                            maze[posX - 2][posY] = 0;
                            maze[posX - 1][posY] = 0;
                            posX -= 2;
                            break;
                        case "S":
                            maze[posX + 2][posY] = 0;
                            maze[posX + 1][posY] = 0;
                            posX += 2;
                            break;
                        case "W":
                            maze[posX][posY - 2] = 0;
                            maze[posX][posY - 1] = 0;
                            posY -= 2;
                            break;
                        case "E":
                            maze[posX][posY + 2] = 0;
                            maze[posX][posY + 1] = 0;
                            posY += 2;
                            break;
                    }
                    moves.push(posY + posX * mazeWidth);
                } else {
                    var back = moves.pop();
                    posX = Math.floor(back / mazeWidth);
                    posY = back % mazeWidth;
                }
                drawMaze(posX, posY);
            } else {
                window.clearInterval(interval);
            }
        });
    }
}

function drawMaze(posX, posY) {
    mazeGraphics.clear();
    mazeGraphics.beginFill(0xcccccc);
    for (i = 0; i < mazeHeight; i++) {
        for (j = 0; j < mazeWidth; j++) {
            if (maze[i][j] == 1) {
                TileFactory.getWall(j,i).display();
               // CTX.fillStyle = "#000";
                //CTX.strokeRect(posX * 10, posY * 10, 10, 10);
            } else {
                TileFactory.getWalkable(j, i).display();
            }
        }
    }
    mazeGraphics.endFill();
    mazeGraphics.beginFill(0xff0000);
    mazeGraphics.drawRect(posY * tileSize, posX * tileSize, tileSize, tileSize);
    mazeGraphics.endFill();
}
