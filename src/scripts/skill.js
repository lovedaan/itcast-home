(function() {
    'use strict';
    var speed = 1;

    var canvasDom = document.querySelector('#skill_canvas');

    var width = canvasDom.width = canvasDom.clientWidth;
    var height = canvasDom.height;// = canvasDom.clientHeight;

    var target = {
        title: 'WEB全栈',
        font: 20,
        radius: 65,
        border: 50,
        borderColor: 'rgba(42, 52, 102, .1)',
        fillColor: 'rgba(42, 52, 102, 1)',
        position: {
            x: width / 2,
            y: height / 2
        },
        skills: [{
            radius: 120,
            child: [{
                title: 'Node.js',
                font: 12,
                angle: 90 * 0,
                radius: 33,
                border: 22,
                borderColor: 'rgba(249, 77, 90, .1)',
                fillColor: 'rgba(249, 77, 90, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'HTML5',
                font: 12,
                angle: 90 * 1,
                radius: 36,
                border: 22,
                borderColor: 'rgba(111, 188, 228, .1)',
                fillColor: 'rgba(111, 188, 228, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'CSS3',
                font: 12,
                angle: 90 * 2,
                radius: 34,
                border: 22,
                borderColor: 'rgba(160, 225, 172, .1)',
                fillColor: 'rgba(160, 225, 172, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'jQuery',
                font: 12,
                angle: 90 * 3,
                radius: 32,
                border: 22,
                borderColor: 'rgba(189, 72, 238, .1)',
                fillColor: 'rgba(189, 72, 238, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }, {
            radius: 215,
            child: [{
                title: 'React.js',
                font: 12,
                angle: 72 * 0,
                radius: 38,
                border: 22,
                borderColor: 'rgba(228, 52, 106, .1)',
                fillColor: 'rgba(228, 52, 106, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'Canvas',
                font: 12,
                angle: 72 * 1,
                radius: 35,
                border: 22,
                borderColor: 'rgba(233, 240, 29, .1)',
                fillColor: 'rgba(233, 240, 29, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'Zepto.js',
                font: 12,
                angle: 72 * 2,
                radius: 43,
                border: 22,
                borderColor: 'rgba(49, 141, 255, .1)',
                fillColor: 'rgba(49, 141, 255, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'WebApp',
                font: 12,
                angle: 72 * 3,
                radius: 45,
                border: 22,
                borderColor: 'rgba((77, 161, 189, .1)',
                fillColor: 'rgba(77, 161, 189, .7)',
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                title: 'Angular.js',
                font: 12,
                radius: 40,
                angle: 72 * 4,
                border: 22,
                borderColor: 'rgba(207, 39, 130, .1)',
                fillColor: 'rgba(207, 39, 130, 1)',
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }]
    };

    var context = canvasDom.getContext('2d');


    function getPoint(angle, radius) {
        return {
            x: width / 2 + radius * Math.cos(angle * Math.PI / 180),
            y: height / 2 + radius * Math.sin(angle * Math.PI / 180)
        };
    }

    // function getRandomColor() {
    //     var colors = ['rgb(207, 39, 130)'];
    // }

    function update() {
        for (var i = 0; i < target.skills.length; i++) {
            for (var j = 0; j < target.skills[i].child.length; j++) {
                var item = target.skills[i].child[j];
                item.angle += i % 2 ? (i / 3 + 1) * speed : -(i / 3 + 1) * speed;
                item.position = getPoint(item.angle, target.skills[i].radius);
            }
        }
    }


    function drawItem(item) {
        context.beginPath();
        // 绘制中心园
        context.arc(item.position.x, item.position.y, item.radius, 0, Math.PI * 2);
        context.strokeStyle = item.borderColor;
        context.lineWidth = item.border;
        context.stroke();
        context.fillStyle = item.fillColor;
        context.fill();
        // 绘制文字
        context.font = item.font + 'px Georgia';
        context.fillStyle = '#fff';
        context.textAlign = 'center';
        // context.shadowColor = "rgba(100,100,100,1)";
        // context.shadowOffsetX = 1;
        // context.shadowOffsetY = 1;
        // context.shadowBlur = 10;
        context.fillText(item.title, item.position.x, item.position.y + item.font / 2);
        context.closePath();
    }

    function render() {
        // 重置画布
        // canvasDom.width = width;
        context.clearRect(0, 0, width, height);
        drawItem(target);
        for (var i = 0; i < target.skills.length; i++) {
            for (var j = 0; j < target.skills[i].child.length; j++) {
                drawItem(target.skills[i].child[j]);
            }
        }
    }
    // 序列帧动画
    // setInterval(function() {
    //     update();
    //     render();
    // }, 1000 / fps);

    function frame() {
        update();
        render();
        requestAnimationFrame(frame); // setTimeout(, 1000 / fps);
    }
    requestAnimationFrame(frame);
    canvasDom.addEventListener('mouseover', function() {
        speed = 0.2;
    });
    canvasDom.addEventListener('mouseout', function() {
        speed = 1;
    });
})();
