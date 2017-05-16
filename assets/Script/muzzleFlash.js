var mfDb = [
                {
                    name: "Machine Gun",
                    anchorX: 2,
                    scale: 1,
                    frames: [0, 1],
                    stop: [0.05, 0.05],
                    opa: [1, 0.5],
                },
                {
                    name: "Cannon Tier 1",
                    anchorX: 1.53,
                    scale: 1,
                    frames: [2, 3, 4, 5, 6, 7],
                    stop: [0.15, 0.15, 0.1, 0.1, 0.1, 0.1],
                    opa: [1, 1, 0.8, 0.6, 0.4, 0.2],
                },
                {
                    name: "Missile 1",
                    anchorX: 1.4,
                    scale: 1,
                    frames: [2, 3, 4, 5, 6, 7],
                    stop: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                    opa: [1, 1, 0.8, 0.6, 0.4, 0.2],
                },
                {
                    name: "Machine Gun 2",
                    anchorX: 2.2,
                    scale: 0.5,
                    frames: [2, 3, 4, 5, 6, 7],
                    stop: [0.05, 0.07, 0.05, 0.05, 0.05, 0.05],
                    opa: [1, 1, 0.8, 0.6, 0.4, 0.2],
                },
];

cc.Class({
    extends: cc.Component,

    properties: {
        mf: [cc.SpriteFrame],
        //ff: 0,
        timer: 0,
        stage: 0
    },
    init: function(id) {
        this.timer = 0;
        this.ff = id;
        this.stage = 0;

        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.mf[mfDb[id].frames[0]];
        sprite.trim = false;
        this.sprite = sprite;

        this.node.setAnchorPoint(mfDb[id].anchorX, 0.5);
        this.node.setScale(mfDb[id].scale);
    },
    mfUpdate: function(dt) {
        //this.sprite.spriteFrame = this.mf[this.ff];
        var thisDb = mfDb[this.ff];        
        this.timer += dt;

        if (this.timer > thisDb.stop[this.stage]) {
            this.stage++;
            this.timer = 0;
            //if (this.ff == 0) console.log("000");

            if (this.stage >= thisDb.stop.length) {
                this.node.destroy();
            } else {
                this.sprite.spriteFrame = this.mf[thisDb.frames[this.stage]];
                this.node.opacity = thisDb.opa[this.stage] * 255;
            }
        }


    }
});
