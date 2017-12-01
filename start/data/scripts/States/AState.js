class AState{
    constructor(main){
        this.main = main;
        this.textY = 20;
    }
    
    drawDesc(){
        CTX.font = "14px Arial";
        CTX.fillStyle = "black";
        CTX.textAlign = "left";
        var y = 20;
        
        this.writeText("Génération de labyrinthe avec le recursive backtracker");
        this.writeText("Système de tuile isométriques");
        this.writeText("Agents autonomes qui errent sans but");
        this.textY = 20;
        
    }
    writeText(text, y){
        CTX.fillText(text, 20, this.textY);
        this.textY += 14;
    }
    start(){};    
    end(){};
}