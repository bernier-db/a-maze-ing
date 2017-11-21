/// Agents autonomes qui se balades sans but dans le labyrinthe
class Boid extends Drawable {

    constructor(pos, maze) {
        if (!pos)
            pos = {
                x: 1.5,
                y: 1.5
            };
        super(null, pos.x, pos.y);

        this.acc = new PVector(0, 0);
        this.vel = new PVector(0, 0);
        this.target = new PVector(pos.x + 0.5, pos.y);
        this.maxForce = 0.01;
        this.maxSpeed = 0.05;
        this.ray = 3;
        this.maze = maze;

        this.adaptTarget = this.adaptTarget.bind(this);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {

        this.adaptTarget();

        this.applyForce(this.steer());
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);

        this.loc.add(this.vel);
    }

    steer() {
        var desired = PVector.sub(this.target, this.loc);
        desired.normalize();
        desired.mult(this.maxSpeed);

        var steer = PVector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    adaptTarget() {
        var dir = PVector.sub(this.target, this.loc);
        if (Math.abs(dir.mag()) < 0.5) {
            this.target.add(dir);
            this.target.floor();
        }
        
        var x = Math.floor(this.loc.x);
        var y = Math.floor(this.loc.y);


        //si on peut pas y aller, on regarde autour de sois
        if (this.maze[this.target.x][this.target.y] instanceof TileWall) {

            if (this.maze[x - 1][y] instanceof TileWalkable) {
                this.target.x = this.loc.x - 0.5;
                this.target.y = this.loc.y;
            } else if (this.maze[x][y - 1] instanceof TileWalkable) {
                this.target.x = x;
                this.target.y = y - 0.5;
            } else if (this.maze[x + 1][y] instanceof TileWalkable) {
                this.target.x = x + 0.5;
                this.target.y = y;
            } else if (this.maze[x][y + 1] instanceof TileWalkable) {
                this.target.x = x;
                this.target.y = y + 0.5;
            } else {
                this.target.x = x;
                this.target.y = y;
            }
        }
     
       // this.target.add({x:0.5, y:0.5});
    }


    display() {

        this.absLoc = isometricToScreen(this.loc.x, this.loc.y);

        CTX.fillStyle = "#000";
        CTX.strokeStyle = "#fff";
        CTX.save();
        CTX.translate(CANVAS_W / 2 + DRAW_TILE_W / 2, 0);
        CTX.beginPath();
        CTX.ellipse(this.absLoc.x, this.absLoc.y, this.ray, this.ray, 0, 0, TWO_PI);
        CTX.fill();


        CTX.restore();
    }


}
