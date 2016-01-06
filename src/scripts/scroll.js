(function(window) {
    'use strict';
    var document = window.document;
    // var $ = window.jQuery;

    // 滚动事件
    // window.addEventListener('scroll', function() {
    //     var scroll = window.getScroll();
    //     document.body.setAttribute('data-scrolled', scroll.y > 0);
    // })
    // window.trigger('scroll');
    // function inView(selector, top) {
    //     var $element = typeof selector === 'string' ? $(selector) : selector;
    //     var scrollTop = $element.offset().top - top;
    //     return scrollTop - window.innerHeight <= 0 && scrollTop >= -$element.height();
    // }

    // var $logoElement = $('#advantage .logo');
    // var $salaryElement = $('#salary .container');
    function optimizedScroll() {
        var scroll = window.getScroll();
        var offset = document.body.getAttribute('data-offset') || 5;
        document.body.setAttribute('data-scrolled', scroll.y > offset);
        // // logo显示
        // if (inView($logoElement, scroll.y)) {
        //     if (!$logoElement.hasClass('rotate')){
        //         $logoElement.addClass('rotate');
        //     }
        // } else {
        //     $logoElement.removeClass('rotate');
        // }
        // chart显示
        // if (inView($salaryElement, scroll.y)) {
        //     if (!$salaryElement.hasClass('show')) {
        //         $salaryElement.addClass('show');
        //         // money();
        //     }
        // } else {
        //     $salaryElement.removeClass('show');
        // }
    }
    // handle event
    window.addEventListener('optimizedScroll', optimizedScroll);
    optimizedScroll();
    // window.optimizedScroll();
    //
    // var i = 0;
    // var current = 0;
    // $(window).on('activate.bs.scrollspy', function() {
    //     if (++i % 2) {
    //         current = 1 - current;
    //         $('main').css('background-image', 'url(images/' + current + '.jpg)');
    //     }
    // });

})(window);
