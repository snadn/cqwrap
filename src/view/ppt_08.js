define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        BgLayer = require('cqwrap/layers').BgLayer,
        PPTLayer = require('src/view/base').PPTLayer,
        RectSprite = require('src/view/base').RectSprite,
        ArrowSprite = require('src/view/base').ArrowSprite;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = PPTLayer.extend({
        init: function(){
            this._super();

            //加载游戏素材资源
            var cache = cc.SpriteFrameCache.getInstance();
                cache.addSpriteFrames("res/img/flappy_packer.plist", "res/img/flappy_packer.png");

            var size = director.getWinSize();

            var label = cc.createSprite('@事件代理 之\n扑腾小鸟', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 400],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);   

            this.pushAction(function(){
                rect = new RectSprite(cc.c4f(0,0.5,0,1), cc.c4f(0,0.5,1,1), 'click me');
                rect.setStyle({
                    size: [200, 500],
                    xy: [550, 100],
                    anchor: [0, 0],
                    opacity: 0,
                    zOrder: 10
                });
                this.addChild(rect);                

                this.delegate(rect);
                var self = this, bird;
                rect.on('touchstart', function(touch, target){
                    var location = touch.getLocation();
                    //cc.log(location);
                    bird = cc.createSprite('bird1.png', {
                        anchor: [0.5, 0.5],
                        xy: [location.x | 0, location.y | 0],
                        scale: 0.5,
                        zOrder: 99,
                        flipX: true
                    });

                    self.addChild(bird); 
                });

                rect.on('touchend', function(){
                    if(bird){
                        bird.animate(0.3, 'bird1.png', 'bird2.png', 'bird3.png').repeat().act();
                        bird.moveBy(3.0, cc.p(-500, 0)).act();
                        bird.delay(5.0).rotateTo(0, 90).moveBy(0.5, cc.p(0, -500)).act();
                    }
                });
            });
            
            this.setNextScene(require('src/view/ppt_09')); 
        }
    });

    var MyScene = BaseScene.extend({
        init:function () {
            this._super();

            var bg = new BgLayer('res/img/background.jpg');
            this.addChild(bg);

            var layer = new MyLayer();
            this.addChild(layer);
        }
    });

    module.exports = MyScene;
});