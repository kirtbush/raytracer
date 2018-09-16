let common = require("./features/common")
let tuple = require("./features/step_definitions/tuple")
let canvas = require("./features/step_definitions/canvas")
let fs = require("fs");
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

let prj1 = position(tuple.point(0, 3, 0), tuple.multiplyScalar(tuple.normalize(tuple.vector(1, 1.8, 0)), 11.25));
let wrld = world(tuple.vector(0.1, -0.2, 0), tuple.vector(-0.01, 0, 0));
let cvs = new canvas.Canvas(900, 550);
let bgColor = new tuple.Color(0, 0, 0);
let projectileColor = new tuple.Color(255, 69, 0);

let idx = 0, idy = 0;
for (idx = 0; idx < cvs.width; idx++) {
    for (idy = 0; idy < cvs.height; idy++) {
        cvs.write_pixel(idx, idy, bgColor);
    }
}

function tick(w, p) {
    let newPos = tuple.add(p.position, p.velocity);
    let newVelocity = tuple.add(tuple.add(p.velocity, w.gravity), w.wind);
    cvs.write_pixel(newPos.x, cvs.height - newPos.y, projectileColor);
    return position(newPos, newVelocity);
}

let iterations = 0;
while (prj1.position.y > 0 && iterations++ < 10000) {
    prj1 = tick(wrld, prj1);
    console.log("position: (" + prj1.position.x + "," + prj1.position.y + ")");
}

let ppmString = canvas.canvas_to_ppm(cvs);
var stream = fs.createWriteStream("projectile.ppm");
stream.once('open', function (fd) {
    stream.write(ppmString);
    stream.end();
});

console.log("Finished");