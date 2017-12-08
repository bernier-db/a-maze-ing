class SplashScreenState extends AState {
    constructor(main) {
        super(main);
        this.interval;
        this.opacity = 1.0;
        this.draw = this.draw.bind(this);
        this.drawText = false;
        TextureManager.getInstance(this.start.bind(this));
        

    }

    start(instance) {
        if(!RELEASE){
            this.end();
            return;
        }
        
        this.title = instance.splash;
        
        this.interval = window.setInterval(function () {
            this.draw();
            this.opacity -= 0.01 / this.opacity;

            if (this.opacity <= 0) {
                clearInterval(this.interval);
                console.log("end");
                this.drawText = true;
                this.draw();
                setTimeout(this.fadeout.bind(this), 2000);

            }
        }.bind(this), 30);

    }

    fadeout() {
        this.opacity = 0;
        this.interval = window.setInterval(function () {
            this.draw();
            this.opacity += 0.01;
            if (this.opacity >= 1) {
                clearInterval(this.interval);
                this.end();
            }
        }.bind(this), 15);
    }

    draw() {
        var w = CANVAS_W * 0.75;
        var h = w * this.title.height / this.title.width;
        var x = (CANVAS_W - w) / 2
        var y = (CANVAS_H - h) / 2;


        CTX.drawImage(this.title, x, y, w, h);

        if (this.drawText) {
            CTX.fillStyle = "black";
            CTX.textAlign = "right";
            CTX.textBaseline = "top";
            CTX.font = "25px Arial";
            CTX.fillText("by DBern", x + w, y + h);
        }

        CTX.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        CTX.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }

    end() {
        this.main.State = new ConstructionState(this.main);
    }
}