class AnimationState extends AState {
    constructor(main) {
        super(main);
        this.start();
        this.counter = 0;
    }

    start() {

        window.addEventListener("keypress", this.input.bind(this));
        this.generateBoids();

        //loop d'animation
        this.interval = window.setInterval(function () {
            Board.drawMaze(0, 0, this.main.Board.maze);
            this.drawDesc();
            this.boids.forEach(function (b) {
                b.update();
                b.display();
            }.bind(this));

            if ( RELEASE && ++this.counter >= 10 * 30) {
                this.counter = 0;
                DEBUG = !DEBUG;
            }
        }.bind(this), 1000 / 30);
    }



    end() {
        window.clearInterval(this.interval);
    }

    input(e) {
        if (e.key == "d" || e.key == "D")
            DEBUG = !DEBUG;
    }


    generateBoids() {
        this.boids = [];
        var x, y;
        for (var i = 0; i < nbBoids; i++) {
            do {
                x = Math.floor(Math.random() * (MAZE_W - 3) + 1);
                y = Math.floor(Math.random() * (MAZE_H - 3) + 1);

                if (Math.random() * 10.0 > 1) {
                    x = undefined;
                    y = undefined;
                }
            }
            while (x && this.main.Board.maze[x][y] instanceof TileWall);

            this.boids.push(new Boid(x ? {
                x: x + 0.5,
                y: y + 0.5
            } : undefined, this.main.Board.maze));
        }
    }
}
