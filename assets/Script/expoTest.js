cc.Class({
    extends: cc.Component,

    properties: {
        fram: [cc.SpriteFrame],
        sa: cc.SpriteAtlas,
    },

    // use this for initialization
    onLoad: function () {
        //console.log(this.fram[0].filename);
        //var sprite = this.getComponent(cc.Sprite);
        //sprite.spriteFrame = this.en[enDb[id].frame];
        //cc.loader.loadResDir('Effect/Bullet_Impact1.png', cc.SpriteFrame, function(err, sf) {
            //var sprite = this.getComponent(cc.Sprite);
            //sprite.spriteFrame = sf;
            
            //this.fram[0]._name = "expo10_16";
            //sprite.SpriteFrame = this.fram[0];
            console.log(this.fram[0]);
        //});
    },

    init: function() {
        var sprite = this.getComponent(cc.Sprite);
        sprite.SpriteFrame = this.sa.getSpriteFrame("expo10_16");
        console.log("DDDDD");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
