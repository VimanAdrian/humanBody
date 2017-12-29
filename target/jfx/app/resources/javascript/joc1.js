// jQuery UI Touch Punch 0.2.3 - must load after jQuery UI
// enables touch support for jQuery UI
!function (a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0], d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }

    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var e, b = a.ui.mouse.prototype, c = b._mouseInit, d = b._mouseDestroy;
        b._touchStart = function (a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
        }, b._touchMove = function (a) {
            e && (this._touchMoved = !0, f(a, "mousemove"))
        }, b._touchEnd = function (a) {
            e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
        }, b._mouseInit = function () {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), c.call(b)
        }, b._mouseDestroy = function () {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), d.call(b)
        }
    }
}(jQuery);

var photosArray = ["./../images/puzzle1.png", "./../images/puzzle2.jpg", "./../images/puzzle3.jpg"];
var globalIndex = photosArray.length-1;

function start_puzzle(x) {
    var index = photosArray.length-1;
        while (globalIndex === index && index < photosArray.length){
            index = Math.floor((Math.random() * photosArray.length) + 1);
        }
        globalIndex = index;
    $("#source_image").attr('src', photosArray[globalIndex]);

    $('#puzzle_solved').hide();

    $('#source_image').snapPuzzle({
        rows: x, columns: x,
        pile: '#pile',
        containment: '#puzzle-containment',
        onComplete: function () {
            $('#source_image').fadeOut(150).fadeIn();
            if (x === 3) {
                $('#puzzle_solved').hide();
                $('#puzzle_finished').show();
            } else {
                $('#puzzle_solved').show();
            }
        }
    });
}

$(function () {
    $('#pile').height($('#source_image').height());
    var dim = 2;
    start_puzzle(dim);

    $('.restart-puzzle').click(function () {
        $('#source_image').snapPuzzle('destroy');
        start_puzzle(dim);
    });

    $('.next-puzzle').click(function () {
        $('#source_image').snapPuzzle('destroy');
        start_puzzle(++dim);

    });

    $('#inapoi').click(function () {
        window.location.href = "hello.html";

    });

    $(window).resize(function () {
        $('#pile').height($('#source_image').height());
        $('#source_image').snapPuzzle('refresh');
    });
});
