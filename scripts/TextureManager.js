var TextureManager = (function () {
    var instance;


    function createInstance(callback) {
        if (!instance) {
            var tileset = new Image();
            tileset.src = "./images/tiles.png";
            var title = new Image();
            title.src = "./images/title.png";
            title.addEventListener("load", function () {
                instance = {
                    tiles: tileset,
                    splash: title
                }
                console.log('loaded');
                if(callback) callback(instance);
                return instance;
            });
        } else {
            console.log("existing");
            if(callback) callback(instance);
            return instance;
        }
    }


    return {
        getInstance: function (callback) {
            if (!instance) {
                return createInstance(callback);
            }
            return instance;
        }
    };

})();
