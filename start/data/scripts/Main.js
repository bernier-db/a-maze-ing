class Main {
    constructor(){
        this.board = null;
        this.state = new SplashScreenState(this);
        canvas.requestFullScreen();
    }
    
    set State(val){this.state = val;}
    get Board() {return this.board;}
    
    update(){
        
    }
    
    draw(){}
}