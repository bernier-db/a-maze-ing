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
        this.target = new PVector(pos.x + 1, pos.y);
        this.maxForce = 0.015;
        this.maxSpeed = Math.random() * 0.09 +0.01;
        this.ray = 3;
        this.maze = maze;
        this.lastPos = new PVector(pos.x, pos.y);
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

        
        var temp = this.loc.clone();
       
        this.loc.add(this.vel);
        this.target.add(this.vel);

        var dif = PVector.sub(PVector.floor(this.loc), PVector.floor(temp));
        
        if (dif.x !== 0 || dif.y !== 0) {
            //debugger;
            this.lastPos = temp.clone();
            this.lastPos.floor();
        }
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


        var tX = this.target.x | 0,
            tY = this.target.y | 0;

        //Si je ne peux pas y aller
        if (this.maze[tX] && this.maze[tX][tY] && this.maze[tX][tY] instanceof TileWall) {

            var cur = {
                x: this.loc.x | 0,
                y: this.loc.y | 0
            };
            var dest = new PVector();

            var ok = false;
            var dir;
            var counter = 0;
            do {
                dir = Math.random() * 4 | 0;
                switch (dir) {
                    case 0:
                        if (ok = this.maze[cur.x][cur.y - 1] instanceof TileWalkable) {
                            dest.x = cur.x;
                            dest.y = cur.y - 1;
                        }
                        break;
                    case 1:
                        if (ok = this.maze[cur.x + 1][cur.y] instanceof TileWalkable) {
                            dest.x = cur.x + 1;
                            dest.y = cur.y;
                        }
                        break;
                    case 2:
                        if (ok = this.maze[cur.x][cur.y + 1] instanceof TileWalkable) {
                            dest.x = cur.x;
                            dest.y = cur.y + 1;
                        }
                        break;
                    case 3:
                        if (ok = this.maze[cur.x - 1][cur.y] instanceof TileWalkable) {
                            dest.x = cur.x - 1;
                            dest.y = cur.y;
                        }

                        break;
                }
                dest.floor();
                var dif = PVector.sub(PVector.floor(dest), PVector.floor(this.lastPos));
                
                if ( counter < 25 && ok && dif.mag() == 0){
                    ok = false;
                }
                counter++;
            } while (!ok);
            

            this.target = dest.clone();
            this.target.add(new PVector(0.5, 0.5));
        }
    }


    display() {

        this.absLoc = isometricToScreen(this.loc.x, this.loc.y);
        this.ray = DRAW_TILE_W/10;

        CTX.fillStyle = "#000";
        CTX.strokeStyle = "#fff";

        CTX.save();
        //Dessin boid
        CTX.translate(CANVAS_W / 2 + DRAW_TILE_W / 2, 0);
        CTX.beginPath();
        CTX.ellipse(this.absLoc.x, this.absLoc.y, this.ray, this.ray, 0, 0, TWO_PI);
        CTX.fill();


        //dessin target
        if (DEBUG) {
            CTX.fillStyle = "#f00";
            CTX.beginPath();
            var absTar = isometricToScreen(this.target.x, this.target.y);
            CTX.ellipse(absTar.x, absTar.y, this.ray, this.ray / 2, 0, 0, TWO_PI);
            CTX.fill();
            CTX.beginPath();
            CTX.moveTo(this.absLoc.x, this.absLoc.y);
            CTX.strokeStyle = "#f00";
            CTX.lineTo(absTar.x, absTar.y);
            CTX.stroke();

            //dessin lastpos
            CTX.fillStyle = "#00f";
            CTX.beginPath();
            var abslast = isometricToScreen(this.lastPos.x + 0.5, this.lastPos.y + 0.5);
            CTX.ellipse(abslast.x, abslast.y, this.ray, this.ray / 2, 0, 0, TWO_PI);
            CTX.fill();
        }

        CTX.restore();
    }


}
