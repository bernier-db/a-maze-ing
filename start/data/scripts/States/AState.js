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
        
        this.writeText("Génération aléatoire de labyrinthe avec le recursive backtracker");
        this.writeText("Système de tuile isométriques");
        this.writeText("Agents autonomes qui errent sans but");
        this.writeText("Les couleurs sont simplement pour identifier l'endroit de départ");
        this.textY = 20;
        
    }
    writeText(text,x, y){
        CTX.fillText(text, x || 20, y || this.textY);
        if(!y)
            this.textY += 15;
    }
    start(){};    
    end(){};
}