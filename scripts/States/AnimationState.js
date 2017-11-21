class AnimationState extends AState {
    constructor(main) {
        super(main);
    }

    start() {
        this.generateBoids();
        console.log(this.boids);
        var interval = window.setInterval(function(){
            Board.drawMaze(0,0, this.main.Board.maze);
           this.boids.forEach(function(b){
               b.update();
               b.display();
           }.bind(this)); 
        }.bind(this), 1000/30);
    }

    end() {}


    generateBoids() {
        this.boids = [];
        var x, y;
        for (var i = 0; i < 20; i++) {
            do {
                x = Math.floor(Math.random() * MAZE_W);
                y = Math.floor(Math.random() * MAZE_H);
            } 
            while (this.main.Board.maze[x][y] instanceof TileWall);

            this.boids.push(new Boid({
                x: x+0.5,
                y: y+0.5
            },this.main.Board.maze));
        }
    }
}
