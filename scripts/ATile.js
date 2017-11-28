class ATile extends Drawable{
    constructor(walkable, texture, x, y, tileNum){
        var abs = isometricToScreen(x,y);
        super(texture, x, y);
        
        this.abs_pos = abs;
        this.tileNum = tileNum;
        this.isWalkable = walkable;
        this.txPos = this.calcSpritePos();
    }
    
    
    calcSpritePos(){
        var x, y;
        
        x = Math.floor((this.tileNum - 1)* TILE_W);
        y = this.tileNum % TILESET_COL;
        
        return {x: x, y: y}
    }
    
    display(){
        this.abs_pos = isometricToScreen(this.loc.x, this.loc.y);
        CTX.save();
        CTX.translate(CANVAS_W/2,0);
        
        CTX.drawImage(this.texture, this.txPos.x, this.txPos.y, TILE_W, TILE_H, this.abs_pos.x, this.abs_pos.y, DRAW_TILE_W, DRAW_TILE_H);
        CTX.restore();
    }
    
}