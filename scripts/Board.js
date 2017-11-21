class Board {
    constructor(maze) {
        this.maze = maze;
    }

    
    /*
    * Dessinner le labyrinthe
    */
    static drawMaze(posX, posY, maze) {
            CTX.fillStyle = "#cccccc";
            CTX.fillRect(0,0, CANVAS_W, CANVAS_H);
            for (var i = 0; i < MAZE_H; i++) {
                for (var j = 0; j < MAZE_W; j++) {
                    maze[i][j].display();
                }
            }  
        }
}
