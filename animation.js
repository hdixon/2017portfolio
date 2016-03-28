var width = view.bounds.width;
var height = view.bounds.height;

var num = (width * height) / 16000;

// Place the instances of the symbol:
for (var i = 0; i < num; i++) {

    drawCircle(i);

}

function posOrNeg() {
    if (Math.random() >= 0.5) return 1;
    else return - 1;
}

function onFrame(event) {
    for (var i = 0; i < num; i++) {
        var s = project.activeLayer.children[i];
        var dx = Math.sin(((i / num)) / 15) * posOrNeg();
        var dy = Math.sin(((i / num)) / 15) * posOrNeg();

        // move by dx and dy with consideration to momentum
        s.position.x += dx + s.px / 5;
        s.position.y += dy + s.py / 5;

        keepInView(s);
    }
}

function keepInView(item) {
    var position = item.position;
    var itemBounds = item.bounds;
    var bounds = view.bounds;
    if (itemBounds.left > bounds.width) {
        position.x = -item.bounds.width;
    }

    if (position.x < -itemBounds.width) {
        position.x = bounds.width + itemBounds.width;
    }

    if (itemBounds.top > view.size.height) {
        position.y = -itemBounds.height;
    }

    if (position.y < -itemBounds.height) {
        position.y = bounds.height + itemBounds.height / 2;
    }
}

function drawCircle(i) {
    var center = Point.random() * view.size;
    var scale = (i + 1) / num; // makes circles of all sizes
    var s = new Shape.Circle(center, 120 * scale);
    s.blendMode = 'multiply';
    s.opacity = (1 - Math.random()) + 0.5;

    // generate initial momentums; bigger ones move slower
    s.px = 1.5 * posOrNeg() * Math.random() * (1 - (i / num));
    s.py = 1.5 * posOrNeg() * Math.random() * (1 - (i / num));

    if (i % 2 == 0) {
        s.fillColor = '#def';
    } else {
        s.fillColor = '#abc'; // blue
    }
}
