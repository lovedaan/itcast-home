(function(window) {
    'use strict';
    // var document = window.document;
    var $ = window.jQuery;
    /**
     * 美化滚动条样式
     */
    var scroll = $('html[data-nicescroll="true"]').niceScroll({
        cursorcolor: '#fff',
        cursoropacitymax: 0.8,
        cursorwidth: '10px',
        cursorborder: '0',
        cursorborderradius: '5px',
        // mousescrollstep: window.innerHeight / 10 * 54 / 100,
        mousescrollstep: 60,
        scrollspeed: 60,
        touchbehavior: false
    });

    /**
     * 滚动到指定section 动画效果
     */
    function scrollMove(target) {
        scroll.doScrollTop($(target).offset().top, 400);
    }

    /**
     * 导航到指定section
     */
    if (scroll.length !== 0) {
        $('#nav_menu .nav-link, #btn_start').on('click', function() {
            var target = $(this).attr('href');
            scrollMove(target);
            return false;
        });
    }

    /**
     * 右侧咨询到指定section
     */
    $('#consult').on('click', '.consult-link', function() {
        var target = $(this).attr('href');
        scrollMove(target);
        return false;
    });
    /**
     * 课程大纲
     */
    // $('#syllabus > .section-inner > .container').css('height', window.innerHeight - 200).niceScroll({
    //     cursorcolor: '#fff',
    //     cursoropacitymax: 0.5,
    //     cursorwidth: '10px',
    //     cursorborder: '0',
    //     cursorborderradius: '5px',
    //     mousescrollstep: window.innerHeight / 10 * 54 / 100,
    //     scrollspeed: 160,
    //     touchbehavior: false
    // });

    /**
     * 动态加载所有SVG
     */
    // $('svg').on('load', function() {
    //     var $this = $(this);
    //     $.get($this.data('src'), function(content) {
    //         var doc = content.documentElement;
    //         // doc.width=$this.attr('width');
    //         // doc.height=$this.attr('height');
    //         $this.after(doc).remove();
    //     });
    // });
    $('svg').on('load', function() {
        var $this = $(this);
        $.get($this.data('src')).success(function(content) {
            var doc = content.documentElement;
            // doc.width=$this.attr('width');
            // doc.height=$this.attr('height');
            $this.after(doc).remove();
        }).error(function() {
            var $img = $('<img/>').attr('src', $this.data('img'));
            $this.after($img).remove();
        });
    });

    $('#referrer').val(window.document.referrer);

    /**
     * 立即报名 校验
     */
    function check() {
        var realname = $('#realname'),
            phone = $('#phone'),
            //email = $('#email'),
            qq = $('#qq'),
            address = $('#address'),
            realnamereg = /^[\u4E00-\u9FA5]+$/,
            phonereg = /^[1][3-9][0-9]{9}$/,
            qqreg = /^[1-9]\d{4,}$/,
            //emailreg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            //shuoreg = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i,
            url = '';
        try {
            url = window.location.href;
        } catch (M) {
            if (window.parent) {
                try {
                    url = window.parent.document.referrer;
                } catch (L) {
                    url = '';
                }
            }
        }
        if (url === '') {
            url = document.referrer;
        }
        $('#u').val(url);
        if (!realnamereg.test(realname.val())) {
            realname.focus().val('');
            window.alert('请输入正确的中文名称！');
            return false;
        } else if (!phonereg.test(phone.val())) {
            phone.focus().val('');
            window.alert('请输入正确的手机！');
            return false;
        } else if (typeof qq.val() !== 'undefined' && !qqreg.test(qq.val())) {
            qq.focus().val('');
            window.alert('请输入正确的QQ号码！');
            return false;
        } else if (address.val() === '0') {
            window.alert('请选择上课地址！');
            return false;
        }
        /*else if( typeof email.val() !== 'undefined' && !emailreg.test(email.val())){
            email.focus().val('');
            window.alert('请输入正确的邮箱地址！');
            return false;
        } */
        else {
            $('#addform').submit();
            window.alert('申请成功！\r\n咨询客服人员将会主动联系您，请耐心等待！');
            $('input[name=\'source\']:checked').removeAttr('checked');
        }
    }

    /**
     * 表单校验
     */
    $('#btn_apply').on('click', function() {
        if (check() === false) {
            return false;
        }
    });
})(window);
