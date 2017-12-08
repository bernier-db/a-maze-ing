class AnimationState extends AState {
    constructor(main) {
        super(main);
        this.start();
        this.counter = 0;
		adaptSize();
    }

    start() {

        window.addEventListener("keypress", this.input.bind(this));
        this.generateBoids();

        //loop d'animation
        this.interval = window.setInterval(function () {
            Board.drawMaze(0, 0, this.main.Board.maze);
            this.drawDesc();
            if(DEBUG){
                this.drawDebug();
            }
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
                x = Math.floor(Math.random() * (MAZE_W - 3) + 1)+0.5;
                y = Math.floor(Math.random() * (MAZE_H - 3) + 1)+0.5;

            }
            while (this.main.Board.maze[x-0.5][y-0.5] instanceof TileWall);

            //trouver les colorés
			if (Math.random() * 5 < 4) {
				x = undefined;
				y = undefined;
			}

            var pos = {x:x,y:y};
            this.boids.push(new Boid(pos, this.main.Board.maze));
        }
    }


	drawDebug(){
        this.drawDebugDetail("#ff7b00", 20, CANVAS_H-35, "Target à atteindre -> Steering force toujours en direction de ce target.", true);
        this.drawDebugDetail("red", 20, CANVAS_H-50, "Dernière position -> Pour éviter de reculer, sauf si aucun autre choix (après 5 essais random).", false);

    }

    drawDebugDetail(color, x, y, text, fill){
		var ray = 8;

		CTX.strokeStyle = color;
		CTX.fillStyle = color;
		CTX.beginPath();
		CTX.ellipse(x, y, ray, ray / 2, 0, 0, TWO_PI);
		CTX.stroke();
		if(fill)
			CTX.fill();

		CTX.textBaseline = "middle";
		CTX.fillText(text, x+ray+5,y);
    }
}
