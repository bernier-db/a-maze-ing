class Board {
    constructor() {
        this.maze = [];
        this.createMaze();
        this.isReady = false;
    }

    /**
    * Création avec le recursive Backtracker
    */
    createMaze() {
        var moves = [];
        for (var i = 0; i < MAZE_H; i++) {
            this.maze[i] = [];
            for (var j = 0; j < MAZE_W; j++) {
                this.maze[i][j] = 1;
            }
        }
        var posX = 1;
        var posY = 1;
        this.maze[posX][posY] = 0;
        moves.push(posY + posY * MAZE_W);
        var interval = window.setInterval(function () {
            if (moves.length) {
                var possibleDirections = "";
                if (posX + 2 > 0 && posX + 2 < MAZE_H - 1 && this.maze[posX + 2][posY] == 1) {
                    possibleDirections += "S";
                }
                if (posX - 2 > 0 && posX - 2 < MAZE_H - 1 && this.maze[posX - 2][posY] == 1) {
                    possibleDirections += "N";
                }
                if (posY - 2 > 0 && posY - 2 < MAZE_W - 1 && this.maze[posX][posY - 2] == 1) {
                    possibleDirections += "W";
                }
                if (posY + 2 > 0 && posY + 2 < MAZE_W - 1 && this.maze[posX][posY + 2] == 1) {
                    possibleDirections += "E";
                }
                if (possibleDirections) {
                    var move = Math.floor(Math.random() * possibleDirections.length);
                    switch (possibleDirections[move]) {
                        case "N":
                            this.maze[posX - 2][posY] = 0;
                            this.maze[posX - 1][posY] = 0;
                            posX -= 2;
                            break;
                        case "S":
                            this.maze[posX + 2][posY] = 0;
                            this.maze[posX + 1][posY] = 0;
                            posX += 2;
                            break;
                        case "W":
                            this.maze[posX][posY - 2] = 0;
                            this.maze[posX][posY - 1] = 0;
                            posY -= 2;
                            break;
                        case "E":
                            this.maze[posX][posY + 2] = 0;
                            this.maze[posX][posY + 1] = 0;
                            posY += 2;
                            break;
                    }
                    moves.push(posY + posX * MAZE_W);
                } else {
                    var back = moves.pop();
                    posX = Math.floor(back / MAZE_W);
                    posY = back % MAZE_W;
                }
                this.drawMaze(posX, posY);
            } else {
                clearInterval(interval);
                console.log("Done!");
                new Boid().display();
            }
        }.bind(this));
 
    }
    
    drawMaze(posX, posY) {
            CTX.fillStyle = "#cccccc";
            CTX.fillRect(0,0, CANVAS_W, CANVAS_H);
            for (var i = 0; i < MAZE_H; i++) {
                for (var j = 0; j < MAZE_W; j++) {
                    if (this.maze[i][j] == 1) {
                        TileFactory.getWall(j,i).display();
                    } else {
                         TileFactory.getWalkable(j,i).display();
                    }
                }
            }
            
        }
}
