import * as common from "./features/common";
import * as tuple from "./features/step_definitions/tuple";
import * as canvas from "./features/step_definitions/canvas";
import * as matrices from "./features/step_definitions/matrices";
import * as fs from "fs";


//let common = require("./features/common")
//let tuple = require("./features/step_definitions/tuple")

//let fs = require("fs");
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

let prj1 = position(new tuple.point(0, 3, 0), tuple.multiplyScalar(tuple.normalize(new tuple.vector(1, 1.8, 0)), 11.25));
let wrld = world(new tuple.vector(0.1, -0.2, 0), new tuple.vector(-0.01, 0, 0));
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

//Chapter 3 matrix tests

function MatrixTests(){
    console.log("Matrix Tests:");
    let ident4 = matrices.identity(4);
    ident4.print();
    let ident4Inv = matrices.invert(ident4);
    console.log("identity matrix inverted:");
    ident4Inv.print();
    
    let testArray =
        [[9, 3, 0, 9],
        [-5, -2, -6, -3],
        [-4, 9, 6, 4],
        [-7, 6, 6, 2]];
    
    console.log("testM1:");
    let testM1 = matrices.copyFromArrays(testArray);
    testM1.print();
    let testM1Inv = matrices.invert(testM1);
    testM1Inv.print();
    let testM1multi = testM1.multiply(testM1Inv);
    testM1multi.print();
    
    if(testM1multi.equals(matrices.identity(4)))
        console.log("Identity Found!");
    
    let invOfTrans = matrices.invert(matrices.transpose(testM1));
    let transOfinv = matrices.transpose(matrices.invert(testM1));
    
    console.log("invOfTrans:\n");
    invOfTrans.print();
    
    console.log("transOfinv:\n");
    transOfinv.print();
    
    if(invOfTrans.equals(transOfinv))
        console.log("trans<->inv test is true!");
    
    let testTuple = new tuple.tuple(1,2,3,4);
    let testIdent = matrices.identity(4);
    testIdent[2][2] = 7;

    let newtuple = testIdent.multiplyByTuple(testTuple);
    console.log("newIdent:");
    newtuple.print();
}

MatrixTests();

console.log("\nAppTest Finished");