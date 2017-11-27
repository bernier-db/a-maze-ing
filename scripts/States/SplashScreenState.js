class SplashScreenState extends AState{
    constructor(main){
        super(main);
    }
    
    start(){
        
        var title = new Image();
        title.src = "/images/title.png";
        
        var w = title.width * 0.75;
        var x = (CANVAS_W - w)/2
        
        title.onload = function(){
            CTX.drawImage(title, x,0, w, title.height*0.75);
        console.log("draw title");
        window.setTimeout(this.end(), 5000); 
        }.bind(this);
           
    }
    
    end(){
        this.main.State = new ConstructionState(this.main);
    }
}