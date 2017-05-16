const Plane = require('Plane');
const Soldier = require('Soldier');

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
        soldier: {
            default: null,
            type: cc.Prefab            
        },
        enemyLayer: {
            default: null,
            type: cc.Node
        },
        //targ: cc.Node,
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

        if (this.timer > 1.3) {
            this.timer = 0;
            console.log("new soldier");

            var newSoldier = cc.instantiate(this.soldier);
            newSoldier.getComponent('Soldier').init();
            this.enemyLayer.addChild(newSoldier);
        }

        var enArr = this.enemyLayer.getChildren();

        for (var i=0; i < enArr.length; i++) {
            var v1 = cc.v2(480, 320);
            var v2 = cc.v2(enArr[i].x, enArr[i].y);
            var dist = cc.pDistance(v1, v2);
            //console.log(i + ":" + dist);
            if (dist < 200) {
                enArr[i].opacity = 100;
            }
            else {
                enArr[i].opacity = 255;
            }

            console.log(enArr[i].getComponent('Soldier').timer);

        }


        /*if (this.timer > 2 && this.timer < 4) {
            console.log("fadfdfdsfa");
            var newPlane = cc.instantiate(this.planes);
            this.planeLayer.addChild(newPlane, 1, 3);
            //newPlane.setPosition(cc.v2(320,3));
            newPlane.getComponent('Plane').init();
            this.timer = 5;
        }*/

        //if (this.timer > 1) {
            //this.timer = 0;
            //this.px++;
            //this.py++;
        //}


            

            //this.vecc = this.planeLayer[0].getPosition();
            //var temp = this.planeLayer.getChildByTag(3);
            //this.vecc = temp.getPosition();

            //var xx = temp.getPositionX() - 227;
            //var yy = temp.getPositionY() - 65;

            //var xx = cc.Event.EventMouse.getLocationX() - 227;
            //var yy = cc.Event.EventMouse.getLocationY() - 65;

            //console.log(this.vecc);
            //console.log(xx + ", " + yy);
            
            //this.angle = Math.atan2(xx, yy) / Math.PI * 180;
            //if (yy > 65) this.angle = this.angle * -1 + 180;

            /*var xx = this.targ.x - 480;
            var yy = this.targ.y - 320;

            console.log(xx + ", " + yy);

            this.angle = Math.atan2(xx, yy) / Math.PI * 180;

            console.log("angle:" + this.angle);

            this.turrent.rotation = this.angle;*/
    }
});
