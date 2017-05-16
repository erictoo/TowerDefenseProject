cc.Class({
    extends: cc.Component,

    properties: {
        guns: [cc.SpriteFrame],
    },
    usegun: function(obj) {
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.guns[obj.id];

        this.node.setAnchorPoint(obj.anchorX, obj.anchorY);
        this.node.setScale(obj.scale);
    }
});
