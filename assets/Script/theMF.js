cc.Class({
    extends: cc.Component,

    properties: {
        bases: [cc.SpriteFrame],
    },
    useMuzz: function(obj) {
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.bases[0];

        this.node.setAnchorPoint(2, 0.5);
        //this.node.setScale(obj.scale);
        this.node.opacity = 0;
    },
    showMZ: function(angle) {
        this.node.rotation = angle;
    }
});
