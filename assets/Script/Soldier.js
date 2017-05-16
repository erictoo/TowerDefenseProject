cc.Class({
    extends: cc.Component,

    properties: {
        moveSpd: 30
    },

    // use this for initialization
    onLoad: function () {
        this.moveSpd = 60;
    },

    init: function() {
        this.node.x = -10;
        this.node.y = Math.random() * 640;

        this.timer = 0;
        this.orient = 0;
        this.tarAng = 0;
    },

    checkT: function() {
        return this.timer;
    },

    update: function (dt) {
        this.node.x += this.moveSpd * dt;

        this.timer += dt;

        if (this.timer < 0.3) {
            this.tarAng = 0;
            this.orient = 1;
        } else if (this.timer < 0.5) {
            this.tarAng = 25;
            this.orient = 1;
        } else if (this.timer < 0.8) {
            this.tarAng = 0;
            this.orient = -1;
        } else if (this.timer < 1) {
            this.tarAng = -25;
            this.orient = -1;
        } else {
            this.timer = 0;
        }

        this.orient *= 0.75;

        if (this.node.rotation != this.tarAng) this.node.rotation += this.orient;
    },
});
