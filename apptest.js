var common = require("./features/common");
var tuple = require("./features/step_definitions/tuple");
var canvas = require("./features/step_definitions/canvas");
var fs = require("fs");
//cannon projectile test
console.log("apptest start");
function world(grv, wnd) {
    // this.gravity = grv;
    // this.wind = wnd;
    return { gravity: grv, wind: wnd };
}
function position(pt, vel) {
    return { position: pt, velocity: vel };
}
var prj1 = position(tuple.point(0, 3, 0), tuple.multiplyScalar(tuple.normalize(tuple.vector(1, 1.8, 0)), 11.25));
var wrld = world(tuple.vector(0.1, -0.2, 0), tuple.vector(-0.01, 0, 0));
var cvs = new canvas.Canvas(900, 550);
var bgColor = new tuple.Color(0, 0, 0);
var projectileColor = new tuple.Color(255, 69, 0);
var idx = 0, idy = 0;
for (idx = 0; idx < cvs.width; idx++) {
    for (idy = 0; idy < cvs.height; idy++) {
        cvs.write_pixel(idx, idy, bgColor);
    }
}
function tick(w, p) {
    var newPos = tuple.add(p.position, p.velocity);
    var newVelocity = tuple.add(tuple.add(p.velocity, w.gravity), w.wind);
    cvs.write_pixel(newPos.x, cvs.height - newPos.y, projectileColor);
    return position(newPos, newVelocity);
}
var iterations = 0;
while (prj1.position.y > 0 && iterations++ < 10000) {
    prj1 = tick(wrld, prj1);
    console.log("position: (" + prj1.position.x + "," + prj1.position.y + ")");
}
var ppmString = canvas.canvas_to_ppm(cvs);
var stream = fs.createWriteStream("projectile.ppm");
stream.once('open', function (fd) {
    stream.write(ppmString);
    stream.end();
});
console.log("Finished");
