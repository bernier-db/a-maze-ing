class Boid extends Drawable {

    constructor() {
        var pos = {
            x: 1.5,
            y: 1.5
        };
        super(null, pos.x, pos.y);

        this.acc = new PVector(0, 0);
        this.vel = new PVector(0, 0);
        this.target = new PVector(0, 0);
        this.maxForce = 0.03;
        this.maxSpeed = 2;
        this.ray = 5;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
    }

    steer() {
        var desired = PVector.sub(this.target, this.absLoc);
        desired.normalize();
        desired.mult(this.maxSpeed);

        var steer = PVector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    display() {

        var iso = screenToIsometric(this.absLoc.x, this.absLoc.y);

        this.loc.x = iso.x;
        this.loc.y = iso.y;
        var theta = this.vel.heading() + Math.PI/2
        
        CTX.fillStyle = "#000";
        CTX.strokeStyle = "#fff";
        CTX.save();
        CTX.translate(CANVAS_W / 2, 0);
        CTX.ellipse(this.absLoc.x, this.absLoc.y, this.ray, this.ray, 0,0, TWO_PI);
        CTX.fill();
       
        CTX.restore();
        
        console.log(this.loc);
    }

}
