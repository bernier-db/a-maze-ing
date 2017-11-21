var TextureManager = (function() {
    var instance;



    function createInstance() {

        var tileset = new Image();
        tileset.src = "./images/tiles.png";

        instance = {
            tiles: tileset
        }
        return instance;
    }


    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();
