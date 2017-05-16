const Plane = require('Plane');

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        turrent: {
            default: null,
            type: cc.Node
        },
        planes: {
            default: null,
            type: cc.Prefab
        },
        planeLayer: {
            default: null,
            type: cc.Node
        },
        targ: cc.Node,
        px: 100,
        py: 100,
        timer: 0,
        angle: 0,
        vecc: null
    },

    // use this for initialization
    onLoad: function () {
        this.planesPool = new cc.NodePool('Plane');
    },

    update: function(dt) {
        //this.turrent.setPosition(this.px, this.py);
        this.timer += dt;

        if (this.timer > 2 && this.timer < 4) {
            console.log("fadfdfdsfa");
            var newPlane = cc.instantiate(this.planes);
            this.planeLayer.addChild(newPlane, 1, 3);
            //newPlane.setPosition(cc.v2(320,3));
            newPlane.getComponent('Plane').init();
            this.timer = 5;
        }

        //if (this.timer > 1) {
            //this.timer = 0;
            //this.px++;
            //this.py++;
        //}

        if (this.timer > 5) {

            

            //this.vecc = this.planeLayer[0].getPosition();
            var temp = this.planeLayer.getChildByTag(3);
            //this.vecc = temp.getPosition();

            var xx = temp.getPositionX() - 227;
            var yy = temp.getPositionY() - 65;

            //var xx = cc.Event.EventMouse.getLocationX() - 227;
            //var yy = cc.Event.EventMouse.getLocationY() - 65;

            //console.log(this.vecc);
            //console.log(xx + ", " + yy);
            
            //this.angle = Math.atan2(xx, yy) / Math.PI * 180;
            //if (yy > 65) this.angle = this.angle * -1 + 180;

            console.log(this.targ.x + ", " + this.targ.y);

            this.angle = Math.atan2(this.targ.x, this.targ.y) / Math.PI * 180;

            console.log("angle:" + this.angle);

            this.turrent.rotation = this.angle;
        }
    }
});
