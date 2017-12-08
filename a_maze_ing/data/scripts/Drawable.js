class Drawable {
    constructor(texture, x, y){
        var abs = isometricToScreen(x,y);
        this.texture = texture;
        this.loc = new PVector(x,y);
        this.absLoc = new PVector(abs.x, abs.y);
        this.height;
        this.width;
    }
    
    
    display(){}
}