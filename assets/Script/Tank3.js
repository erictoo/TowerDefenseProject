cc.Class({
    extends: cc.Component,

    properties: {
        tank: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.speed = 180;
    },

    moving: function (dt) {
        if (this.node.x > 1000) {
            this.node.destroy();
        }
        this.node.x += dt * this.speed;
    },
});
