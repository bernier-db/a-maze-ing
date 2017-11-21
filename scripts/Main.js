class Main {
    constructor(){
        this.board = null;// = new Board(this.update.bind(this));
        this.state = new SplashScreenState(this);
    }
    
    set State(val){this.state = val;}
    get Board() {return this.board;}
    
    update(){
        
    }
    
    draw(){}
}