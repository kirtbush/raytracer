import * as tuple from "./features/step_definitions/tuple";
import * as canvas from "./features/step_definitions/canvas";
import * as matrices from "./features/step_definitions/matrices";
import * as fs from "fs";
import * as transforms from "./features/step_definitions/transforms";
import { Sphere } from "./features/step_definitions/spheres";
import { Ray } from "./features/step_definitions/rays";
import { hit, Intersection } from "./features/step_definitions/intersections";
import { Material, lighting } from "./features/step_definitions/materials";
import { point_light } from "./features/step_definitions/lights";

//cannon projectile test
console.log("apptest start");

function world(grv: tuple.vector, wnd: tuple.vector) {
    // this.gravity = grv;
    // this.wind = wnd;
    return { gravity: grv, wind: wnd };
}

function position(pt: tuple.point, vel: tuple.vector) {
    return { position: pt, velocity: vel };
}

function tick(w, p) {
    let newPos = tuple.add(p.position, p.velocity);
    let newVelocity = tuple.add(tuple.add(p.velocity, w.gravity), w.wind);
    cvs.write_pixel(newPos.x, cvs.height - newPos.y, projectileColor);
    return position(newPos, newVelocity);
}

const cvs = new canvas.Canvas(900, 550);
const projectileColor = new tuple.Color(255, 69, 0);
const bgColor = new tuple.Color(0, 0, 0);

function CanvasTest() {
    let prj1 = position(new tuple.point(0, 3, 0), tuple.multiplyScalar(tuple.normalize(new tuple.vector(1, 1.8, 0)), 11.25));
    let wrld = world(new tuple.vector(0.1, -0.2, 0), new tuple.vector(-0.01, 0, 0));

    let idx = 0, idy = 0;
    for (idx = 0; idx < cvs.width; idx++) {
        for (idy = 0; idy < cvs.height; idy++) {
            cvs.write_pixel(idx, idy, bgColor);
        }
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
};
//Chapter 3 matrix tests

function MatrixTests() {
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

    if (testM1multi.equals(matrices.identity(4)))
        console.log("Identity Found!");

    let invOfTrans = matrices.invert(matrices.transpose(testM1));
    let transOfinv = matrices.transpose(matrices.invert(testM1));

    console.log("invOfTrans:\n");
    invOfTrans.print();

    console.log("transOfinv:\n");
    transOfinv.print();

    if (invOfTrans.equals(transOfinv))
        console.log("trans<->inv test is true!");

    let testTuple = new tuple.tuple(1, 2, 3, 4);
    let testIdent = matrices.identity(4);
    testIdent[2][2] = 7;

    let newtuple = testIdent.multiplyByTuple(testTuple);
    console.log("newIdent:");
    newtuple.print();
}

function ClockTransformTest() {
    let cvs = new canvas.Canvas(400, 400);
    let origin = new tuple.point(200, 200, 0);
    let rot = Math.PI / 6;
    let trans = transforms.translation(1, 0, 0);
    let scale = transforms.scaling(0.6, 0, 0);

    //write the background
    for (let idx = 0; idx < cvs.width; idx++) {
        for (let idy = 0; idy < cvs.height; idy++) {
            cvs.write_pixel(idx, idy, bgColor);
        }
    }

    // create the first point
    // translate it one unit +y axis

    let firstPtPos = trans.multiplyByTuple(origin);

    // scale it along the y axis
    firstPtPos = scale.multiplyByTuple(firstPtPos);

    for (let n = 0; n < 12; n++) {
        let newPos = tuple.add(transforms.rotation_z(rot * n).multiplyByTuple(firstPtPos), origin);

        //write it
        cvs.write_pixel(newPos.x, newPos.y, projectileColor);
        console.log("newPos.x:" + newPos.x + " newPos.y:" + newPos.y);
    }

    let ppmString = canvas.canvas_to_ppm(cvs);
    var stream = fs.createWriteStream("clock.ppm");
    stream.once('open', function (fd) {
        stream.write(ppmString);
        stream.end();
    });
}

function DrawSphere(sphere: Sphere, light:point_light, fname: string) {
    let canvas_pixels = 100;
    let cvs = new canvas.Canvas(canvas_pixels, canvas_pixels);
    let ray_origin = new tuple.point(0, 0, -5);
    //let sphereColor = new tuple.Color(1, 0, 0);
    let wall_z = 10;
    let wall_size = 7.0;
    let pixel_size = wall_size / canvas_pixels;
    let half = wall_size / 2;

    //let testR = new Ray(ray_origin, new tuple.vector(50, 50, wall_z));

    console.log("testing points!");
    for (let idy = 0; idy < 100; idy++) {
        let world_y = half - (pixel_size * idy);
        for (let idx = 0; idx < 100; idx++) {
            let world_x = -half + (pixel_size * idx);

            let position = new tuple.point(world_x, world_y, wall_z);
            //cast the ray
            let R = new Ray(ray_origin, tuple.normalize(tuple.sub(position, ray_origin)));
            let isect = sphere.intersects(R);
            let hitObjects: Intersection = hit(isect);

            //this could be an array, but in our test there is only one sphere

            if ((hitObjects != null) && sphere.equals(hitObjects.object)) {
                let point = R.position(hitObjects.t);
                let normal = sphere.normal_at(point);
                let eye = tuple.negate(R.direction);
                let sphere_lighting = lighting(hitObjects.object.material, light, point, eye, normal);
                canvas.write_pixel(cvs, idx, idy, sphere_lighting);
                //console.log("${idx}, ${idy}: hit sphere!");
            }
        }
    }

    let ppmString = canvas.canvas_to_ppm(cvs);
    var stream = fs.createWriteStream(fname);
    stream.once('open', function (fd) {
        stream.write(ppmString);
        stream.end();
    });
}

function C5_simple_sphere() {
    let sphere = new Sphere(new tuple.point(0, 0, 0), 1);
    let basic_light = new point_light(new tuple.point(-10, 10, -10), new tuple.Color(1, 0.2, 1));
    DrawSphere(sphere, basic_light, "sphereintersect.ppm");
    // shrink it along the y axis
    sphere.transformMatrix = transforms.scaling(1, 0.5, 1);
    DrawSphere(sphere, basic_light, "sphereintersect2.ppm");

    // # shrink it along the x-axis
    sphere.transformMatrix = transforms.scaling(0.5, 1, 1);
    DrawSphere(sphere, basic_light, "sphereintersect3.ppm");

    // # shrink it, and rotate it!
    sphere.transformMatrix = transforms.rotation_z(Math.PI / 4).multiply(transforms.scaling(0.5, 1, 1));
    DrawSphere(sphere, basic_light, "sphereintersect4.ppm");

    // # shrink it, and skew it!
    sphere.transformMatrix = transforms.shearing(1, 0, 0, 0, 0, 0).multiply(transforms.scaling(0.5, 1, 1));
    DrawSphere(sphere, basic_light, "sphereintersect5.ppm");
}

function C6_lighting_sphere() {
    let sphere = new Sphere(new tuple.point(0, 0, 0), 1);
    //add material (pink)
    sphere.material = new Material();
    sphere.material.color = new tuple.Color(1, 0.2, 1);

    //create a light behind above and to the left of the eye
    let light_position = new tuple.point(-10, 10, -10);
    let light_color = new tuple.Color(1, 1, 1);
    let light = new point_light(light_position, light_color);

    DrawSphere(sphere, light, "lit_sphere.ppm");
    // shrink it along the y axis
    sphere.transformMatrix = transforms.scaling(1, 0.5, 1);
    DrawSphere(sphere, light, "lit_sphere2.ppm");

    // # shrink it along the x-axis
    sphere.transformMatrix = transforms.scaling(0.5, 1, 1);
    DrawSphere(sphere, light, "lit_sphere3.ppm");

    // # shrink it, and rotate it!
    sphere.transformMatrix = transforms.rotation_z(Math.PI / 4).multiply(transforms.scaling(0.5, 1, 1));
    DrawSphere(sphere, light, "lit_sphere4.ppm");

    // # shrink it, and skew it!
    sphere.transformMatrix = transforms.shearing(1, 0, 0, 0, 0, 0).multiply(transforms.scaling(0.5, 1, 1));
    DrawSphere(sphere, light, "lit_sphere5.ppm");
}

CanvasTest();
MatrixTests();
ClockTransformTest();
C5_simple_sphere();
C6_lighting_sphere();

console.log("\nAppTest Finished");