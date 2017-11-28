class AnimationState extends AState {
    constructor(main) {
        super(main);
    }

    start() {
        
        window.addEventListener("keypress", this.input.bind(this));
        this.generateBoids();
        
        //loop d'animation
       this.interval = window.setInterval(function(){
            Board.drawMaze(0,0, this.main.Board.maze);
           this.boids.forEach(function(b){
               b.update();
               b.display();
           }.bind(this)); 
        }.bind(this), 1000/30);
    }

    
    
    end() {
        window.clearInterval(this.interval);
    }
    
    input(e){
        if(e.key == "d" || e.key == "D")
            DEBUG = !DEBUG;
    }


    generateBoids() {
        this.boids = [];
        var x, y;
        for (var i = 0; i < nbBoids; i++) {
            do {
                x = Math.floor(Math.random() * (MAZE_W-3) +1);
                y = Math.floor(Math.random() *( MAZE_H-3) +1 );
            } 
            while (this.main.Board.maze[x][y] instanceof TileWall);

            this.boids.push(new Boid({
                x: x+0.5,
                y: y+0.5
            },this.main.Board.maze));
        }
    }
}
