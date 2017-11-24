class ConstructionState extends AState{
    constructor(main){
        super(main);
        
    }
    
    start(){
        this.maze = [];
        this.buildMaze();     
    }
    
    end(){
        this.main.board = new Board(this.maze);
        this.main.State = new AnimationState(this.main);
    }
    
    
    buildMaze(){
        var moves = [];
        for (var i = 0; i < MAZE_H; i++) {
            this.maze[i] = [];
            for (var j = 0; j < MAZE_W; j++) {
                this.maze[i][j] = TileFactory.getWall(i, j);
            }
        }
        var posX = 1;
        var posY = 1;
        this.maze[posX][posY] = TileFactory.getWalkable(posX, posY);
        moves.push(posY + posY * MAZE_W);
        var interval = window.setInterval(function () {
            if (moves.length) {
                var possibleDirections = "";
                if (posX + 2 > 0 && posX + 2 < MAZE_H - 1 && this.maze[posX + 2][posY] instanceof TileWall) {
                    possibleDirections += "S";
                }
                if (posX - 2 > 0 && posX - 2 < MAZE_H - 1 && this.maze[posX - 2][posY] instanceof TileWall) {
                    possibleDirections += "N";
                }
                if (posY - 2 > 0 && posY - 2 < MAZE_W - 1 && this.maze[posX][posY - 2] instanceof TileWall) {
                    possibleDirections += "W";
                }
                if (posY + 2 > 0 && posY + 2 < MAZE_W - 1 && this.maze[posX][posY + 2] instanceof TileWall) {
                    possibleDirections += "E";
                }
                if (possibleDirections) {
                    var move = Math.floor(Math.random() * possibleDirections.length);
                    switch (possibleDirections[move]) {
                        case "N":
                            this.maze[posX - 2][posY] = TileFactory.getWalkable(posX-2, posY);
                            this.maze[posX - 1][posY] = TileFactory.getWalkable(posX-1, posY);
                            posX -= 2;
                            break;
                        case "S":
                            this.maze[posX + 2][posY] = TileFactory.getWalkable(posX+2, posY);
                            this.maze[posX + 1][posY] = TileFactory.getWalkable(posX+1, posY);
                            posX += 2;
                            break;
                        case "W":
                            this.maze[posX][posY - 2] = TileFactory.getWalkable(posX, posY-2);
                            this.maze[posX][posY - 1] = TileFactory.getWalkable(posX, posY-1);
                            posY -= 2;
                            break;
                        case "E":
                            this.maze[posX][posY + 2] = TileFactory.getWalkable(posX, posY+2);
                            this.maze[posX][posY + 1] = TileFactory.getWalkable(posX, posY+1);
                            posY += 2;
                            break;
                    }
                    moves.push(posY + posX * MAZE_W);
                   // Board.drawMaze(posX, posY, this.maze);
                } else {
                    var back = moves.pop();
                    posX = Math.floor(back / MAZE_W);
                    posY = back % MAZE_W;
                }
                
            } else {
                clearInterval(interval);
                this.end();
            }
        }.bind(this));
    }
}