cc.Class({
    extends: cc.Component,

    properties: {
        px: 30,
        py: 320,
        game: {
            default:null,
            serializable: false
        }
    },

    // use this for initialization
    onLoad: function () {
        this.enabled = false;
    },

    init: function () {
        //this.game = game;
        this.enabled = true;
        this.node.opacity = 255;
        this.px = 0;
        this.py = 320;
        this.node.setPosition(this.px, this.py);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.setPosition(this.px, this.py);
        this.px+=2;
        //this.py++;
    },
});
