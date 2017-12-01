class TileFactory {
    constructor(){}
    
    static getWalkable(x,y){
        return new TileWalkable(TextureManager.getInstance().tiles,x,y);
    }
    static getWall(x,y){
        return new TileWall(TextureManager.getInstance().tiles,x,y);
    }
}