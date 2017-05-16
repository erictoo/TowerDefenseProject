cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    cal: function () {
        console.warn("cal start");
        this.node.opacity = 0;
        var x = 1;
        for (var i=0; i<10; i++) {
            x += Math.random();
        }
        console.log(x);
        this.node.opacity = 255;
        this.node.emit('hello');
    },

    onLoad: function() {
        this.timer = 0;
        this.lap = true;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timer += dt;
        if (this.timer > 5 && this.lap) {
            this.cal();
            this.lap = false;
        }
    },
});
