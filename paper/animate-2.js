var w = view.bounds.width;
var h = view.bounds.height;
var elemHeight = 100 + h / 3;

var bgColors = ["#F59529", "#3F3F9F", "#54D0DF", "#FFFFF", "#000000"]
var bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

var circlePoint = new Point(425, 130); // update with a function to getcurrent circle point
var textPoint = circlePoint + 50;

var startPoint = new Point(50, elemHeight);
var midPoint = new Point(w / 2 + 50, h / 4);
var endPoint = new Point(w - 50, elemHeight);

var p = new Path([startPoint, midPoint, endPoint]);

updatePoints();

function percentDayOver() {
  var d = new Date(), e = new Date(d);
  var msSinceMidnight = e - d.setHours(0,0,0,0);
  return (msSinceMidnight / 86400000);
}

function pathLengthCompleted() {
  return percentDayOver() * p.length;
}

function drawBackground() {
    // draw background
    var rect = new Rectangle({
        x: 0,
        y: 0,
        width: w,
        height: elemHeight
    });
    var bg = new Shape.Rectangle(rect);
    bg.fillColor = bgColor;
}

function drawPath() {
    // draw path
    p = new Path([startPoint, midPoint, endPoint])
    p.strokeColor = "#FFFFFF";
    p.strokeWidth = 2;
    p.blendMode = "exclusion"
    p.smooth();
    // p.dashArray = [1, 2];
    return p;
}

function drawText() {
    // get time
    var now = new Date();
    var h = now.getHours() % 12;
    var m = now.getMinutes();
    // get location
    // get weather

    // draw text
    var text = new PointText(textPoint);
    text.justification = 'left';
    text.fillColor = '#FFFFFF';
    text.blendMode = "exclusion"
    text.content = '72º' + '\n' + 'Pittsburgh, PA' + "\n" + h + ":" + m;
    text.content = "\n" + h + ":" + m;

    text.fontSize = '1.2em'
    text.fontFamily = "Futura"
    text.leading = "18"
}

function drawAll() {
  drawBackground();
  drawCircle();
  drawPath();
  drawText();
}

function updatePoints() {
  // make sure these are the same as the top globals;
  w = view.bounds.width;
  h = view.bounds.height;
  elemHeight = 100 + h / 3;

  startPoint = new Point(50, elemHeight);
  midPoint = new Point(w / 2 + 50, h / 4);
  endPoint = new Point(w - 50, elemHeight);

  circlePoint = calcCircle();
  textPoint = circlePoint;
  textPoint.x += 37;
  textPoint.y -= 30;
}

function onResize(event) {
  updatePoints();
  drawAll();
}

function calcCircle() {
  var loc = p.getPointAt(pathLengthCompleted());
  return loc;
}

function drawCircle() {
  var point = calcCircle();
  var c = new Shape.Circle(point, 25);
  c.fillColor = "white";
  c.blendMode = "exclusion"
}

drawAll();
