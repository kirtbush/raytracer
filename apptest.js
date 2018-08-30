let common = require("./features/common")
let tuple = require("./features/step_definitions/tuple")

//cannon projectile test
console.log("apptest start");

function world(grv, wnd) {
    // this.gravity = grv;
    // this.wind = wnd;
    return { gravity: grv, wind: wnd };
}

function position(pt, vel) {
    return {position: pt, velocity: vel};
}

let prj1 = position(tuple.point(0, 3, 0), tuple.normalize(tuple.vector(1, 1, 0)));
let wrld = world(tuple.vector(0, -0.025, 0), tuple.vector(-0.01, -0.01, 0));


function tick(w, p) {
    let newPos = tuple.add(p.position, p.velocity);
    let newVelocity = tuple.add(tuple.add(p.velocity, w.gravity), w.wind);
    return position(newPos, newVelocity);
}

let iterations = 0;
while(prj1.position.y > 0 && iterations++ < 10000) {
    prj1 = tick(wrld, prj1);
    console.log("position: ("+prj1.position.x+","+ prj1.position.y+")");
}