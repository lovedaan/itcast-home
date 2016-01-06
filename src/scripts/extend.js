(function(window) {
    'use strict';
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    var prefix;
    //通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
    for (var i = 0; i < prefixes.length; i++) {
        if (requestAnimationFrame && cancelAnimationFrame) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
        cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
    }

    //如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
    if (!requestAnimationFrame || !cancelAnimationFrame) {
        requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function(id) {
            window.clearTimeout(id);
        };
    }

    //得到兼容各浏览器的API
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    /**
     * 优化滚动事件
     * @param  {Object} function(window [description]
     * @return {[type]}                 [description]
     */
    var throttle = function(type, name, target) {
        var obj = target || window;
        var running = false;
        var func = function() {
            if (running) {
                return;
            }
            running = true;
            window.requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('scroll', 'optimizedScroll');

    /**
     * 获取窗体滚动信息
     * @return {Object} 包含滚动信息的对象
     */
    Window.prototype.getScroll = function() {
        return {
            x: (this.pageXOffset !== undefined) ? this.pageXOffset : (this.document.documentElement || this.document.body.parentNode || this.document.body).scrollLeft,
            y: (this.pageYOffset !== undefined) ? this.pageYOffset : (this.document.documentElement || this.document.body.parentNode || this.document.body).scrollTop
        };
    };
})(window);
