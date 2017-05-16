const theGun = require("theGun"),
    theBase = require("theBase"),
    gunSpec = require("commonData").turretSpecifications;

cc.Class({
    extends: cc.Component,

    properties: {
        base: cc.Node,
        gun: cc.Node,
        //mzf: cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function(id) {
        this.id = id;
        this.type = gunSpec[id];
        this.name = this.type.name;
        this.range = this.type.range;
        this.interval = this.type.interval;
        this.damage = this.type.damage;
        this.aoe = this.type.aoe;
        this.gun.getComponent("theGun").usegun(this.type);
        this.base.getComponent("theBase").usebase(this.type);
        //this.mzf.getComponent("theMF").useMuzz(this.type);

        this.fire = -1;
        this.recoil = 0;
        this.timer = 0;

        this.node.setScale(0.75);
    },

    turretUpdate: function(timer) {
        this.gun.anchorX = this.type.anchorX - this.type.recoilD * (timer / this.type.recoilT);
    },

    turrentUpdate: function (dt) {
        switch (this.recoil) {
            case 2:
                this.timer += dt;
                this.gun.anchorX = this.type.anchorX - this.type.recoilD * (this.timer / this.type.recoilT);
                if (this.timer > this.type.recoilT) this.recoil = 1;
            break;
            case 1:
                this.timer -= dt;
                this.gun.anchorX = this.type.anchorX - this.type.recoilD * (this.timer / this.type.recoilT);
                if (this.timer <= 0) {
                    this.recoil = 0;
                    this.gun.anchorX = this.type.anchorX;
                }
            break;
        }
    },
});
