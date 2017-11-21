class SplashScreenState extends AState{
    constructor(main){
        super(main);
    }
    
    start(){this.end();}
    
    end(){
        this.main.State = new ConstructionState(this.main);
    }
}