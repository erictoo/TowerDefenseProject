cc.Class({
    extends: cc.Component,

    properties: {
        game: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.timer = 0;
        this.running = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function(event) {
        switch (event.keyCode) {
            case cc.KEY.escape:
                this.game.active = false;
            break;
            case cc.KEY.a:
                this.game.active = true;
            break;
        }
    },

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {
        /*
        this.timer += dt;
        if (this.timer > 5 && this.running) {
            this.game.active = false;
            this.running = false;
        }
        if (this.timer > 8) {
            this.game.active = true;
            this.running = true;
            this.timer = 0;
        }
        */
    //},
});
