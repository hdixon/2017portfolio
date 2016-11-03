var numStars = 50;

var width = view.bounds.width;
var height = view.bounds.height;



function generateStar() {
    var distances = [1, 2, 3];
    var maxSize = 25;

    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);
    var inertia = Math.random();
    var distance = Math.floor(Math.random() * 3);
    var size = Math.floor(Math.random() * maxSize);
    var mass = Math.random();
    var color;
    var r;

    if (distance == 1) {
        color = "rgba(0, 0, 0, 0.95)"; // close
        r = size * 1.5;
    } else if (distance == 2) {
        color = "rgba(0, 0, 0, 0.50)"; // medium
        r = size * 1;
    } else {
        color = "rgba(0, 0, 0, 0.15)";
        r = size * 0.5;
    }

    var star = new Path.Circle(x, y, r);
    star.r = r;
    star.mass = mass;
    star.inertia = inertia * distance;
    star.distance = distance;
    star.fillColor = color;

    return star;
}

function birthStars(n) {
    for (var i = 0; i < n; i++) {
        generateStar();
    }
}

function calcMovement(star) {
  var adjustDistance = star.inertia * (1 / star.distance);
  var adjustMass = (1 / star.mass);
  return adjustDistance * adjustMass * 0.1;
}

birthStars(numStars)

function keepInView(star) {
  var pos = star.position;
  var starBounds = star.bounds;
  var viewBounds = view.bounds;

  if (starBounds.left > viewBounds.width) {
    pos.x = -star.bounds.width;
  }
}

function onFrame(event) {
    var stars = project.activeLayer.children;
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];
        var dx = calcMovement(star);

        star.position.x += dx;
        keepInView(star);
    }
}
