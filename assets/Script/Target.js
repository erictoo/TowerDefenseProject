cc.Class({
    extends: cc.Component,

    properties: {
        nx: 0,
        ny: 0
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        
        //this.bulletPool = new cc.NodePool;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                //self.node.position = touchLoc;
                self.nx = touchLoc.x;
                self.ny = touchLoc.y;
                //self.Accel = true;
                //Accel = true;
                return true;
            },
            onTouchMoved: function(touch, event) {
                var touchLoc = touch.getLocation();
                self.nx = touchLoc.x;
                self.ny = touchLoc.y;
                //self.Accel = true;
                return true;
            },
            onTouchEnded: function() {
                //self.Accel = false;
            }
        }, this.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x = this.nx;
        this.node.y = this.ny;
    },
});
