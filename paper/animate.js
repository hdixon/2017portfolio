var width = view.bounds.width;
var height = view.bounds.height;

var tool = new Tool();

var text = new PointText({
    point: [50, 50],
    content: '',
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 25
});

var text = new PointText({
    point: [50, 50],
    content: '',
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 22
});

tool.onMouseMove = function(event) {
    var x = event.point.x;
    var y = event.point.y;
    var str = x + ", " + y;

    text.point = event.point;


    text.content = str;
}
