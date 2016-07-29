$(function() {
    var canvas = $('.canvas');
    var context = canvas[0].getContext('2d');
    var colors = $('.color');

    var drawColor = '#000';
    var pos1;
    var pos2;

    canvas.on('click', function(e) {
        var pos = getMousePos(canvas, e);

        drawPoint(pos.x, pos.y);

        if (!pos1 && !pos2) {
            // точек нет
            pos1 = pos;
        } else if (!pos2) {
            // есть 1 точка
            pos2 = pos;
            drawLine(pos1, pos2);
        } else {
            // 2 точки
            drawLine(pos1, pos);
            drawLine(pos2, pos);
            pos1 = pos2;
            pos2 = pos;
        }
    });

    colors.on('click', function(e) {
        var color = $(this);
        colors.removeClass('color_active');
        color.addClass('color_active');
        drawColor = color.data('color');
    });

    /**
     * Рисует точку с центром в `x`, `y`
     */
    function drawPoint(x, y) {
        context.fillStyle = drawColor;
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fill();
    }

    /**
     * Рисует линию от точки `posFrom` до `posTo`
     */
    function drawLine(posFrom, posTo) {
        context.strokeStyle = drawColor;
        context.beginPath();
        context.moveTo(posFrom.x, posFrom.y);
        context.lineTo(posTo.x, posTo.y);
        context.stroke();
    }

    /**
     * Кросс-браузерно возвращает координаты мыши относительно `canvas`
     */
    function getMousePos(canvas, e) {
        var rect = canvas[0].getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
});


