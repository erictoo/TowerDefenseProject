var exDb = [
                {
                    name: "Bullet Impact",
                    //anchorX: 2,
                    frames: [7, 8],
                    stop: [0.05, 0.05],
                },
                {
                    name: "Cannon Explosion",
                    //anchorX: 2,
                    frames: [0, 1, 2, 3, 4, 5, 6],
                    stop: [0.05, 0.05, 0.1, 0.1, 0.1, 0.1, 0.1],
                },
                {
                    name: "Missile 1",
                    sprID: 2,
                    anchorX: 2,
                    frames: [2, 3, 4, 5, 6, 7],
                    stop: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
                },
];

cc.Class({
    extends: cc.Component,

    properties: {
        eX: [cc.SpriteFrame],
        //ff: 0,
        timer: 0,
        stage: 0
    },
    init: function(id) {
        this.timer = 0;
        this.ff = id;
        this.stage = 0;

        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.eX[exDb[id].frames[0]];
        this.sprite = sprite;

        //this.node.setAnchorPoint(mfDb[id].anchorX, 0.5);
        //this.node.setScale(obj.scale);
    },
    exUpdate: function(dt) {
        //this.sprite.spriteFrame = this.mf[this.ff];
        var thisDb = exDb[this.ff];        
        this.timer += dt;

        if (this.timer > thisDb.stop[this.stage]) {
            this.stage++;
            this.timer = 0;
            //if (this.ff == 0) console.log("000");

            if (this.stage >= thisDb.stop.length) {
                this.node.destroy();
            } else {
                this.sprite.spriteFrame = this.eX[thisDb.frames[this.stage]];
            }
        }


    }
});
