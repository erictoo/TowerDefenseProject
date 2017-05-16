cc.Class({
    extends: cc.Component,

    properties: {
        bases: [cc.SpriteFrame],
    },
    usebase: function(obj) {
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.bases[obj.base];

        //this.node.setAnchorPoint(obj.anchorX, obj.anchorY);
        //this.node.setScale(obj.scale);
    }
});
