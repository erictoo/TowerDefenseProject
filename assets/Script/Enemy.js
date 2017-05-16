const enDb = require("commonData").enemyData;
    //TD = require("TD");

cc.Class({
    extends: cc.Component,

    properties: {
        en: [cc.SpriteFrame],
        hpBar: cc.ProgressBar,
        //ff: 0,
        timer: 0,
        stage: 0,
        serial: 0,
        //expo: cc.SpriteAtlas,
    },
    init: function(id) {
        this.timer = 0;
        this.ff = id;
        this.stage = 0;
        this.name = enDb[id].name;
        this.speed = enDb[id].speed;
        this.radius = enDb[id].radius;
        this.maxhp = enDb[id].hp;
        this.hp = this.maxhp;

        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.en[enDb[id].frame];
        //var gsf = expo.getSpriteFrames();
        //console.log(gsf);
        //sprite.spriteFrame = gsf[16];
        //sprite.trim = false;
        this.sprite = sprite;

        this.node.setScale(0.8);

        //this.node.setAnchorPoint(enDb[id].anchorX, 0.5);
        //this.node.setScale(enDb[id].scale);
    },
    initPreview: function(id) {
        this.timer = 0;
        this.ff = id;
        this.stage = 0;
        this.name = enDb[id].name;
        this.speed = enDb[id].speed / 2;
        this.radius = enDb[id].radius;
        this.maxhp = enDb[id].hp;
        this.hp = this.maxhp;

        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.en[enDb[id].frame];
        this.sprite = sprite;

        this.node.setScale(0.4);
    },

    getHit: function(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;

        this.hpBar.progress = this.hp / this.maxhp;

        if (this.hp <= 0) this.node.destroy();
    },

    updateBar: function(percent) {
        this.hpBar.progress = percent;
    },

    moving: function(dt) {

        this.node.x += this.speed * dt;

        if (this.node.x > 960 + this.radius) {
            this.node.destroy();
        }
    },
    enUpdate: function(dt) {
        //this.sprite.spriteFrame = this.en[this.ff];
        var thisDb = enDb[this.ff];        
        this.timer += dt;

        if (this.timer > thisDb.stop[this.stage]) {
            this.stage++;
            this.timer = 0;
            //if (this.ff == 0) console.log("000");

            if (this.stage >= thisDb.stop.length) {
                this.node.destroy();
            } else {
                this.sprite.spriteFrame = this.en[thisDb.frames[this.stage]];
                this.node.opacity = thisDb.opa[this.stage] * 255;
            }
        }


    }
});
