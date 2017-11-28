class SplashScreenState extends AState {
    constructor(main) {
        super(main);
    }

    start() {


        var title = TextureManager.getInstance().splash;
        var w = CANVAS_W * 0.75;
        var h = w * title.height / title.width;
        var x = (CANVAS_W - w) / 2
        var y = (CANVAS_H - h) / 2;

        setTimeout(function(){
            CTX.drawImage(title, x, y, w, h);
            console.log("draw title");
            setTimeout(this.end.bind(this), 3000);
        }.bind(this), 500)
    }

    end() {
        this.main.State = new ConstructionState(this.main);
    }
}
