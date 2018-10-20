import assert = require('../../node_modules/assert-plus');
import { Given, When, Then } from "cucumber";
import { isEqualF } from "../common";
import * as tuple from "./tuple";
import * as canvas from "./canvas";
import * as matrices from "./matrices";
import * as transforms from "./transforms";
import { Ray, transform } from "./rays";
import { Sphere, set_transform } from "./spheres";
import { hit, Intersection, IntersectionArray } from "./intersections";
import { point_light } from "./lights";
import { Material, lighting } from "./materials";
import { World } from "./world";


Given('a ← tuple: {float}, {float}, {float}, {float}', function (f1, f2, f3, f4) {

    this.a = new tuple.tuple(f1, f2, f3, f4);
});

Then('a.x = {float}', function (x) {

    assert(isEqualF(this.a.x, x));
});

Then('a.y = {float}', function (y) {

    assert(isEqualF(this.a.y, y));
});


Then('a.z = {float}', function (z) {

    assert(isEqualF(this.a.z, z));
});

Then('a.w = {float}', function (w) {

    assert(isEqualF(this.a.w, w));
});

Then('a is a point', function () {

    assert(tuple.isPoint(this.a));
});

Then('a is not a vector', function () {

    assert(!tuple.isVector(this.a));
});

Then('a is not a point', function () {

    assert(!tuple.isPoint(this.a));
});

Then('a is a vector', function () {

    assert(tuple.isVector(this.a));
});

Given(/p ← point: (.+),(.+),(.+)/, function (int1: number, int2: number, int3) {

    this.p = new tuple.point(int1, int2, int3);
});

Then(/p = tuple: (.+), (.+), (.+), (.+)/, function (int1: number, int2: number, int3: number, int4) {

    assert(tuple.isTupleEqual(this.p, new tuple.tuple(int1, int2, int3, int4)));
});

Given(/v ← vector: (.+),(.+),(.+)/, function (int1: number, int2: number, int3: number) {

    this.v = new tuple.vector(int1, int2, int3);
});

Then(/v = tuple: (.+), (.+), (.+), (.+)/, function (int1: number, int2: number, int3: number, int4) {

    assert(tuple.isTupleEqual(this.v, new tuple.tuple(int1, int2, int3, int4)));
});

//Floating point testing
Given('two values to compare {float}, {float}', function (float, float2) {

    this.float = float;
    this.float2 = float2;
});

Then('first = second', function () {
    assert(isEqualF(this.float, this.float2));
});

Then('first != second', function () {
    assert(!isEqualF(this.float, this.float2));
});

Given(/first ← tuple: (.+), (.+), (.+), (.+)/, function (int1: number, int2: number, int3: number, int4) {
    this.a1 = new tuple.tuple(int1, int2, int3, int4)
});


Given(/second ← tuple: (.+), (.+), (.+), (.+)/, function (int1: number, int2: number, int3: number, int4) {
    this.a2 = new tuple.tuple(int1, int2, int3, int4);
});


Then(/first plus second should equal tuple: (.+), (.+), (.+), (.+)/, function (int: number, int2: number, int3: number, int4) {
    let sumTuple = tuple.add(this.a1, this.a2);
    let inputTuple = new tuple.tuple(int, int2, int3, int4);
    assert(inputTuple, sumTuple);
});

Given("p{int} ← {point}", function (int1, pt) {
    this.p = this.p || [new tuple.point(0, 0, 0)];
    this.p[int1] = pt;
});

Then('p{int} - p{int} = {vector}', function (int1, int2, vector1) {
    let newVect = tuple.sub(this.p[int1], this.p[int2]);
    assert(tuple.isTupleEqual(newVect, vector1));
});

Given('p ← {point}', function (point: tuple.point) {
    this.p = point;
});

Given('v ← {vector}', function (vector: tuple.vector) {
    this.v = vector;
});

Then('p - v = {point}', function (point: tuple.point) {
    let newPoint = tuple.sub(this.p, this.v);
    assert(tuple.isTupleEqual(newPoint, point));
});

Given('v{int} ← {vector}', function (int1, vector) {
    this.v = this.v || [new tuple.vector(0, 0, 0)];
    this.v[int1] = vector;
});

Then('v{int} - v{int} = {vector}', function (int1, int2, vector) {
    let newVect = tuple.sub(this.v[int1], this.v[int2]);
    assert(tuple.isTupleEqual(newVect, vector));
});

Given('zero ← {vector}', function (vector: tuple.vector) {
    this.zero = vector;
});

Then('zero - v = {vector}', function (vector: tuple.vector) {
    let resultVector = tuple.sub(this.zero, this.v);
    assert(tuple.isTupleEqual(resultVector, vector));
});

Given('a ← {tuple}', function (tuple1) {
    this.a = tuple1;
    //console.log(this.a);
});

Then('-a = {tuple}', function (tuple1) {
    //console.log(tuple1);
    assert(tuple.isTupleEqual(tuple.negate(this.a), tuple1));
});

//multiplication and division of scalars
Then('a * {float} = {tuple}', function (float1, tuple1) {

    assert(tuple.isTupleEqual(tuple.multiplyScalar(this.a, float1), tuple1));
});

Then("a \/ {int} = {tuple}", function (int1, tuple1) {
    let float1 = int1.toFixed(3);
    let newTuple = tuple.divideScalar(this.a, float1);
    assert(tuple.isTupleEqual(newTuple, tuple1));
});

//magnitude of vector
Then("{magnitude} = {int}", function (mag, int1) {
    assert(isEqualF(tuple.magnitude(this.v), int1));
});

Then('{magnitude} = {sqrt}', function (mag, sqrt) {
    assert(isEqualF(tuple.magnitude(this.v), sqrt));
});

//normalize vector
Then('{normalize} = {vector}', function (normalizer, vector1) {

    assert(tuple.isTupleEqual(tuple.normalize(this.v), vector1));
});

Then('{normalize} = approximately {vector}', function (normalize, vector1) {

    this.norm = tuple.normalize(vector1);
    assert(tuple.isTupleEqual(tuple.normalize(this.v), vector1))
});

When(/norm ← normalize\(v\)/, function () {

    this.norm = tuple.normalize(this.v);
});

Then('{magnitudenorm} = {int}', function (magnitudenorm, int1) {

    let mag = tuple.magnitude(this.norm);
    assert(mag == int1);
});

//dot product
Given('a ← {vector}', function (vector1) {

    this.a = vector1;
});
Given('b ← {vector}', function (vector1) {

    this.b = vector1;
});

Then('a dot b = {int}', function (int1) {

    assert(isEqualF(tuple.dot(this.a, this.b), int1));
});

Then('a cross b = {vector}', function (vector1) {
    assert(tuple.isTupleEqual(tuple.cross(this.a, this.b), vector1));
});

Then('b cross a = {vector}', function (vector1) {
    assert(tuple.isTupleEqual(tuple.cross(this.b, this.a), vector1));
});

Given('c ← {Color}', function (color1) {
    this.c = color1;
});

Then('c.red = {float}', function (float) {
    assert(isEqualF(this.c.red, float));
});

Then('c.green = {float}', function (float) {
    assert(isEqualF(this.c.green, float));
});

Then('c.blue = {float}', function (float) {
    assert(isEqualF(this.c.blue, float));
});

Given('c1 ← {Color}', function (Color1) {
    this.c1 = Color1;
});

Given('c2 ← {Color}', function (Color1) {
    this.c2 = Color1;
});

Given('c3 ← {Color}', function (Color1) {
    this.c3 = Color1;
});

Then('c1 + c2 = {Color}', function (Color1) {

    let newColor = tuple.add(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});

Then('c1 - c2 = {Color}', function (Color1) {
    let newColor = tuple.sub(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});

Then('c * {int} = {Color}', function (int, Color1) {
    let newColor = tuple.multiplyScalar(this.c, int);
    assert(tuple.isTupleEqual(newColor, Color1));
});

Then('c1 * c2 = {Color}', function (Color1) {
    let newColor = tuple.hadamard_product(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});

//CANVAS
Given('c ← {Canvas}', function (Canvas1) {
    this.c = Canvas1;
});

Then('c.width = {int}', function (int: number) {
    assert(this.c.width, int);
});

Then('c.height = {int}', function (int: number) {
    assert(this.c.height, int);
});

Then('every pixel of c is {Color}', function (Color) {
    let x = 0;
    let y = 0;
    while (x < this.c.width) {
        while (y < this.c.height) {
            assert(tuple.isTupleEqual(this.c.pixels[x][y], Color));
            y++;
        }
        x++;
    }
});

Given('red ← {Color}', function (Color) {
    this.red = Color;
});

When(/write_pixel\(c, (.+), (.+), red\)/, function (int: number, int2: number) {
    canvas.write_pixel(this.c, int, int2, this.red);
});

Then(/pixel_at\(c, (.+), (.+)\) = red/, function (int: number, int2: number) {
    assert(tuple.isTupleEqual(this.c.pixels[int][int2], this.red));
});

//ppm file creation
When('ppm ← {canvas_to_ppm}', function (canvas1) {
    this.ppm = canvas.canvas_to_ppm(this.c);
});

Then('lines {int}-{int} of ppm are', function (int: number, int2: number, docString) {
    var docStringSplit = docString.split("\n");
    var ppmSplit = this.ppm.split("\n");
    let lineCount = int2 - int + 1;

    let ppmArray = ppmSplit.slice(int - 1, int2);

    assert(docStringSplit.length >= lineCount);
    assert(ppmSplit.length >= lineCount);
    let idx = 0;
    for (idx = 0; idx < docStringSplit.length; idx++) {
        // console.log("D"+(idx)+":"+docStringSplit[idx]);
        // console.log("P"+(idx)+":"+ppmArray[idx]);
        assert(docStringSplit[idx] == ppmArray[idx]);
    }
});

When('write_pixel: c, {int}, {int}, c1', function (int: number, int2: number) {
    canvas.write_pixel(this.c, int, int2, this.c1);
});

When('write_pixel: c, {int}, {int}, c2', function (int: number, int2: number) {
    canvas.write_pixel(this.c, int, int2, this.c2);
});

When('write_pixel: c, {int}, {int}, c3', function (int: number, int2: number) {
    canvas.write_pixel(this.c, int, int2, this.c3);
});

When('every pixel of c is set to {Color}', function (clr) {
    let x = 0, y = 0;
    for (y = 0; y < this.c.height; y++) {
        for (x = 0; x < this.c.width; x++) {
            canvas.write_pixel(this.c, x, y, clr);
        }
    }
});

Then('the last character of ppm is a newline', function () {
    this.ppm[this.ppm.length - 1] == "\n";
});

// Matrices
Given('the following {int}x{int} matrix M:', function (int: number, int2: number, dataTable) {
    this.M = matrices.copyFromRawTable(dataTable);
});


Then('M[{int},{int}] = {int}', function (int: number, int2: number, int3: number) {
    let first = this.M[int][int2];
    let second = int3;
    assert(first == second);
});

Then('M[{int},{int}] = {float}', function (int: number, int2: number, float) {
    assert(isEqualF(this.M[int][int2], float));
});

Then('the size of M is {int}', function (int: number) {
    assert(this.M.length == int);
});

Given('the following matrix A:', function (dataTable) {
    this.A = matrices.copyFromRawTable(dataTable);
});

Given('the following matrix B:', function (dataTable) {
    this.B = matrices.copyFromRawTable(dataTable);
});

Then('A = B', function () {
    assert(this.A.equals(this.B));
});

Then('A != B', function () {
    assert(!this.A.equals(this.B));
});

Then('A * B is the following {int}x{int} matrix:', function (int: number, int2: number, dataTable) {
    let testMatrix = matrices.copyFromRawTable(dataTable);
    let resultMatrix = this.A.multiply(this.B);
    let success = testMatrix.equals(resultMatrix);
    assert(success);
});

Given('b ← {tuple}', function (tuple1) {

    this.b = tuple1;
});

Then('A * b = {tuple}', function (tuple1) {

    let resultTuple = this.A.multiplyByTuple(this.b);
    assert(tuple.isTupleEqual(resultTuple, tuple1));
});

Then('A * identity_matrix = A', function () {
    assert(this.A.equals(this.A.multiply(matrices.identity(this.A.length))));
});

Then('identity_matrix * a = a', function () {
    let resultTuple = matrices.identity(4).multiplyByTuple(this.a);
    assert(tuple.isTupleEqual(this.a, resultTuple));
});

Then('{transposedM} is the following matrix:', function (transposedM, dataTable) {
    //let something = eval("this."+transposedM);
    let something = matrices.copyFromRawTable(dataTable);
    let newA = matrices.transpose(this.A);
    assert(newA.equals(something));
    //this.transposedM.copyFromRawTable(dataTable); 
});

Given('A ← {transposedI}', function (transposedI) {

    this.A = matrices.transpose(matrices.identity(4));
});

Then('A = identity_matrix', function () {

    this.A.equals(matrices.identity(4));
});

Given('the following {int}x{int} matrix A:', function (int: number, int2: number, dataTable) {
    this.A = matrices.copyFromRawTable(dataTable);
});

Then(/determinant\(A\) = (.+)/, function (int: number) {

    let determinant = this.A.determinant();
    assert(isEqualF(determinant, int));
});

Then(/submatrix\(A, (.+), (.+)\) is the following (.+)x(.+) matrix:/, function (int: number, int2: number, int3: number, int4, dataTable) {

    let subm = matrices.submatrix(this.A, int, int2);
    assert(subm.equals(matrices.copyFromRawTable(dataTable)));
});

Given(/B ← submatrix\(A, (.+), (.+)\)/, function (int: number, int2: number) {

    this.B = matrices.submatrix(this.A, int, int2);
});

Then(/determinant\(B\) = (.+)/, function (int: number) {

    assert(isEqualF(this.B.determinant(), int));
});

Then(/minor\(A, (.+), (.+)\) = (.+)/, function (int: number, int2: number, int3: number) {

    let minorVal = matrices.minor(this.A, int, int2)
    assert(isEqualF(minorVal, int3));
});

Then(/cofactor\(A, (.+), (.+)\) = (.+)/, function (int: number, int2: number, int3: number) {
    let cofo = matrices.cofactor(this.A, int, int2);
    assert(isEqualF(cofo, int3));
});

Then('A is invertible', function () {
    assert(this.A.isInvertible())
});

Given(/B ← inverse\(A\)/, function () {

    this.B = matrices.invert(this.A);
});

Then(/B\[(.+),(.+)\] = (.+)\/(.+)/, function (int: number, int2: number, int3, int4) {
    assert(isEqualF(this.B[int][int2], int3 / int4));
});

Then('A is not invertible', function () {
    assert(!this.A.isInvertible())
});

Then('B is the following {int}x{int} matrix:', function (int: number, int2: number, dataTable) {
    let dt = matrices.copyFromRawTable(dataTable);

    assert(this.B.equals(dt));
});

Then(/inverse\(A\) is the following (.+)x(.+) matrix:/, function (int: number, int2: number, dataTable) {
    let invA = matrices.invert(this.A);
    let dtM = matrices.copyFromRawTable(dataTable);
    assert(invA.equals(dtM));
});


Given('the following {int}x{int} matrix B:', function (int: number, int2: number, dataTable) {
    this.B = matrices.copyFromRawTable(dataTable);
});

Given('C ← A * B', function () {
    this.C = this.A.multiply(this.B);
});

Then(/C \* inverse\(B\) = A/, function () {
    let bInverted = matrices.invert(this.B);
    let resultMatrix = this.C.multiply(bInverted);
    assert(resultMatrix.equals(this.A));
});

// Chapter 4 transformation and translation
Given(/transform ← translation\((.+), (.+), (.+)\)/, function (int: number, int2: number, int3: number) {
    this.transform = transforms.translation(int, int2, int3);
});
Then('transform * p = {point}', function (point: tuple.point) {
    let resultP = this.transform.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, point));
});

Given(/inv ← inverse\(transform\)/, function () {
    this.inv = matrices.invert(this.transform);
});
Then('inv * p = {point}', function (point: tuple.point) {
    let invTrans = matrices.invert(this.transform);
    assert(this.inv.equals(invTrans));
});

Then('transform * v = v', function () {
    let resultV = this.transform.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultV, this.v));
});

Given(/transform ← scaling\((.+), (.+), (.+)\)/, function (int: number, int2: number, int3: number) {
    this.transform = transforms.scaling(int, int2, int3);
});

Then('transform * v = {vector}', function (vector: tuple.vector) {
    let resultTuple = this.transform.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultTuple, vector));
});

Then('inv * v = {vector}', function (vector: tuple.vector) {
    let resultTuple = this.inv.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultTuple, vector));
});

Given(/half_quarter ← rotation_x\(π \/ (.+)\)/, function (int: number) {
    this.half_quarter = transforms.rotation_x(Math.PI / int);
});

Given(/full_quarter ← rotation_x\(π \/ (.+)\)/, function (int: number) {
    this.full_quarter = transforms.rotation_x(Math.PI / int);
});

// ? Then half_quarter * p = point(0, √2/2, √2/2)
// Undefined. Implement with the following snippet:

Then(/half_quarter \* p = point\(0, √2\/2, √2\/2\)/, function () {
    let pt = new tuple.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});

Then(/half_quarter \* p = point\(√2\/2, 0, √2\/2\)/, function () {
    let pt = new tuple.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});

// ? And full_quarter * p = point(0, 0, 1)
// Undefined. Implement with the following snippet:

Then('full_quarter * p = {point}', function (point: tuple.point) {
    let resultP = this.full_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, point));
});

Given('v ← {point}', function (point: tuple.point) {
    this.v = point;
});

// - And half_quarter ← rotation_x(π / 4) # features/step_definitions/stepdefs.js:405
// ? And inv ← inverse(half_quarter)
// Undefined. Implement with the following snippet:

Given(/inv ← inverse\(half_quarter\)/, function () {
    // Write code here that turns the phrase above into concrete actions
    this.inv = matrices.invert(this.half_quarter);
});

// ? Then inv * v = point(0, √2/2, -√2/2)
// Undefined. Implement with the following snippet:

Then(/inv \* v = point\((.+), (.+), (.+)\)/, function (int: number, int2: number, int3: number) {
    let pt = new tuple.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    let resultV = this.inv.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(pt, resultV));
});


Given(/half_quarter ← rotation_y\(π \/ (.+)\)/, function (int: number) {
    this.half_quarter = transforms.rotation_y(Math.PI / int);
});

// ? And full_quarter ← rotation_y(π / 2)
// Undefined. Implement with the following snippet:

Given(/full_quarter ← rotation_y\(π \/ (.+)\)/, function (int: number) {
    this.full_quarter = transforms.rotation_y(Math.PI / int);
});

// ? And half_quarter ← rotation_z(π / 4)
// Undefined. Implement with the following snippet:

Given(/half_quarter ← rotation_z\(π \/ (.+)\)/, function (int: number) {
    this.half_quarter = transforms.rotation_z(Math.PI / int);
});

// ? And full_quarter ← rotation_z(π / 2)
// Undefined. Implement with the following snippet:

Given(/full_quarter ← rotation_z\(π \/ (.+)\)/, function (int: number) {
    this.full_quarter = transforms.rotation_z(Math.PI / int);
});

// ? Then half_quarter * p = point(-√2/2, √2/2, 0)
// Undefined. Implement with the following snippet:

Then(/half_quarter \* p = point\(-√2\/2, √2\/2, 0\)/, function () {
    let pt = new tuple.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});

// ? Given transform ← shearing(1, 0, 0, 0, 0, 0)
// Undefined. Implement with the following snippet:

Given(/transform ← shearing\((.+), (.+), (.+), (.+), (.+), (.+)\)/, function (int: number, int2: number, int3: number, int4: number, int5: number, int6: number) {
    this.transform = transforms.shearing(int, int2, int3, int4, int5, int6);
});

//Chapter 5 rays and spheres
//   ? Given origin ← point(1, 2, 3)
//   Undefined. Implement with the following snippet:

Given('origin ← {point}', function (point: tuple.point) {
    this.origin = point;
});

// ? And direction ← vector(4, 5, 6)
//   Undefined. Implement with the following snippet:

Given('direction ← {vector}', function (vector: tuple.vector) {
    this.direction = vector;
});

// ? When r ← ray(origin, direction)
//   Undefined. Implement with the following snippet:

When(/r ← ray\(origin, direction\)/, function () {
    this.r = new Ray(this.origin, this.direction);
});

// ? Then r.origin = origin
//   Undefined. Implement with the following snippet:

Then('r.origin = origin', function () {
    assert(tuple.isTupleEqual(this.r.origin, this.origin))
});

// ? And r.direction = direction
//   Undefined. Implement with the following snippet:

Then('r.direction = direction', function () {
    assert(tuple.isTupleEqual(this.r.direction, this.direction))
});

// ? Given r ← ray(point(2, 3, 4), vector(1, 0, 0))
// Undefined. Implement with the following snippet:

Given('r ← {ray}', function (ray: Ray) {
    this.r = ray;
});

// ? Then position(r, 0) = point(2, 3, 4)
// Undefined. Implement with the following snippet:

Then('{position} = {point}', function (pos: tuple.point, point: tuple.point) {
    let newPos = this.r.position(pos);
    assert(newPos, point);
});

//Spheres
Given(/s ← sphere\(\)/, function () {
    // Write code here that turns the phrase above into concrete actions
    this.s = new Sphere(new tuple.point(0, 0, 0), 0);
});

// ? When xs ← intersect(s, r)
// Undefined. Implement with the following snippet:

When(/xs ← intersect\(s, r\)/, function () {
    // Write code here that turns the phrase above into concrete actions
    this.xs = [];
    this.xs = this.s.intersects(this.r);
});

// ? Then xs.count = 2
// Undefined. Implement with the following snippet:

Then('xs.count = {int}', function (int: number) {
    assert(isEqualF(this.xs.length, int));
});

// ? And xs[0] = 4
// Undefined. Implement with the following snippet:

Then('xs[{int}] = {int}', function (int: number, int2: number) {
    assert(isEqualF(this.xs[int].t, int2));
});

//intersections
When(/i ← intersection\(([-]?\d+\.?\d*), s\)/, function (float: number) {
    this.i = new Intersection(float, this.s);
});

//   ? Then i.t = 3.5
//   Undefined. Implement with the following snippet:

Then('i.t = {float}', function (float: number) {
    assert(isEqualF(this.i.t, float));
});

// ? And i.object = s
//   Undefined. Implement with the following snippet:

Then('i.object = s', function () {
    assert(this.i.object === this.s);
});

// ?And i1 ← intersection(1, s)
// Undefined.Implement with the following snippet:

Given(/i([-]?\d+\.?\d*) ← intersection\(([-]?\d+\.?\d*), s\)/, function (int: number, int2: number) {
    this.i = this.i || [];
    this.i[int] = new Intersection(int2, this.s);
});

// ?When xs ← intersections(i1, i2)
// Undefined.Implement with the following snippet:

When(/xs ← intersections\(i([-]?\d+\.?\d*), i([-]?\d+\.?\d*)\)/, function (int: number, int2: number) {
    this.xs = [];
    this.xs = new IntersectionArray([this.i[int], this.i[int2]]);
});

// - Then xs.count = 2 # features\step_definitions\stepdefs.js: 530
//     ? And xs[0].t = 1
// Undefined.Implement with the following snippet:

Then('xs[{int}].t = {int}', function (int: number, int2: number) {
    assert(isEqualF(this.xs[int].t, int2));
});

Then('xs[{int}].object = s', function (int: number) {
    assert(this.xs[int].object == this.s);
});

//hits
When(/h ← hit\(xs\)/, function () {
    this.h = hit(this.xs);
});

Then('h = i{int}', function (int: number) {
    assert(this.h.equals(this.i[int]));
});

Then('h is nothing', function () {
    assert(this.h == null);
});

Given(/xs ← intersections\(i(\d+), i(\d+), i(\d+), i(\d+)\)/, function (int: number, int2: number, int3: number, int4: number) {
    this.xs = new IntersectionArray([this.i[int], this.i[int2], this.i[int3], this.i[int4]]);

});

//   ? And m ← translation(3, 4, 5)
//   Undefined. Implement with the following snippet:

Given(/^m ← translation\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/, function (int: number, int2: number, int3: number) {
    this.m = transforms.translation(int, int2, int3);
});

// ? When r2 ← transform(r, m)
//   Undefined. Implement with the following snippet:

When(/r2 ← transform\(r, m\)/, function () {
    this.r2 = transform(this.r, this.m);
});

// ? Then r2.origin = point(4, 6, 8)
//   Undefined. Implement with the following snippet:

Then('r{int}.origin = {point}', function (int: number, point: tuple.point) {
    assert(tuple.isTupleEqual(this.r2.origin, point));
});

// ? And r2.direction = vector(0, 1, 0)
//   Undefined. Implement with the following snippet:

Then('r{int}.direction = {vector}', function (int: number, vector: tuple.vector) {
    assert(tuple.isTupleEqual(this.r2.direction, vector));
});

Given(/^m ← scaling\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/, function (int: number, int2: number, int3: number) {
    this.m = transforms.scaling(int, int2, int3);
});

Then('s.transform = identity_matrix', function () {
    this.s.transform = matrices.identity(4);
});

Given(/t ← translation\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)/, function (int: number, int2: number, int3: number) {
    this.t = transforms.translation(int, int2, int3);
});

When(/^set_transform\(s, t\)/, function () {
    set_transform(this.s, this.t);
});

When(/^set_transform\(s, translation\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/, function (int: number, int2: number, int3: number) {
    set_transform(this.s, transforms.translation(int, int2, int3));
});

When(/set_transform\(s, scaling\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/, function (int: number, int2: number, int3: number) {
    set_transform(this.s, transforms.scaling(int, int2, int3));
});

//chapter 6 light and shading

When(/n ← normal_at\(s, point\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)\)/, function (int1, int2, int3) {
    this.n = this.s.normal_at(new tuple.point(int1, int2, int3));
});

When(/n ← normal_at\(s, point\((.+)\/(.+), (.+)\/(.+), (.+)\/(.+)\)\)/, function (sqrt, int, sqrt2, int2, sqrt3, int3) {
    let sqrtC = sqrt.startsWith("√") ? Math.sqrt(sqrt.replace("√", "")) : sqrt;
    let sqrtC2 = sqrt2.startsWith("√") ? Math.sqrt(sqrt2.replace("√", "")) : sqrt2;
    let sqrtC3 = sqrt3.startsWith("√") ? Math.sqrt(sqrt3.replace("√", "")) : sqrt3;
    this.n = this.s.normal_at(new tuple.point(sqrtC / int, sqrtC2 / int2, sqrtC3 / int3));
});

Then(/^n = vector\(([-]?\d+\.?\d*), ([-]?\d+\.?\d*), ([-]?\d+\.?\d*)\)$/, function (int1: number, int2: number, int3: number) {
    let v = new tuple.vector(int1, int2, int3);
    assert(tuple.isTupleEqual(this.n, v));
});


Then(/^n = vector\(√3\/3, √3\/3, √3\/3\)$/, function () {
    let v = new tuple.vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3);
    assert(tuple.isTupleEqual(this.n, v));
});

Then(/n = normalize\(n\)/, function () {
    this.n = tuple.normalize(this.n);
});

// ? When n ← normal_at(s, point(0, √2/2, -√2/2))
// Undefined. Implement with the following snippet:

When(/^n ← normal_at\(s, point\(0, √2\/2, -√2\/2\)\)$/, function () {
    this.n = this.s.normal_at(new tuple.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2));
});

Given('n ← {vector}', function (vector) {
    this.n = vector;
});

Given(/n ← vector\(√2\/2, √2\/2, 0\)/, function () {
    this.n = new tuple.vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
});

When(/r ← reflect\(v, n\)/, function () {
    this.r = tuple.reflect(this.v, this.n);
});

Then('r = {vector}', function (vector) {
    assert(this.r, vector);
});

// ? Given intensity ← color(1, 1, 1)
// Undefined. Implement with the following snippet:

Given('intensity ← {Color}', function (Colors) {
    this.intensity = Colors;
});

// ? And position ← point(0, 0, 0)
// Undefined. Implement with the following snippet:

Given('position ← {point}', function (point) {
    this.position = point;
});

// ? When light ← point_light(position, intensity)
// Undefined. Implement with the following snippet:

When(/light ← point_light\(position, intensity\)/, function () {           // Write code here that turns the phrase above into concrete
    this.light = new point_light(this.position, this.intensity);
});

// ? Then light.position = position
// Undefined. Implement with the following snippet:

Then('light.position = position', function () {
    assert(tuple.isTupleEqual(this.light.position, this.position));
});

// ? And light.intensity = intensity
// Undefined. Implement with the following snippet:

Then('light.intensity = intensity', function () {
    assert(tuple.isTupleEqual(this.light.intensity, this.intensity));
});

Given(/m ← material\(\)/, function () {
    this.m = new Material();
});

//   ? Then m.color = color(1, 1, 1)
//   Undefined. Implement with the following snippet:

Then('m.color = {Color}', function (Color: tuple.Color) {
    assert(tuple.isTupleEqual(this.m.color, Color));
});

// ? And m.ambient = 0.1
//   Undefined. Implement with the following snippet:

Then('m.ambient = {sfloat}', function (float: number) {
    assert(this.m.ambient == float);
});

When('m.ambient ← {sfloat}', function (int: number) {
    this.m.ambient = int;
});

// ? And m.diffuse = 0.9
//   Undefined. Implement with the following snippet:

Then('m.diffuse = {sfloat}', function (float: number) {
    assert(this.m.diffuse == float);
});

// ? And m.specular = 0.9
//   Undefined. Implement with the following snippet:

Then('m.specular = {sfloat}', function (float: number) {
    assert(this.m.specular == float);
});

// ? And m.shininess = 200
//   Undefined. Implement with the following snippet:

Then('m.shininess = {sfloat}', function (int: number) {
    assert(this.m.shininess == int);
});

When('m ← s.material', function () {
    this.m = this.s.material;
});

Then(/m = material\(\)/, function () {
    assert(this.m.equals(new Material()))
});

When('s.material ← m', function () {
    this.s.material = this.m;
});

Then('s.material = m', function () {
    assert(this.s.material.equals(this.m));
});

//   ?Given eyev ← vector(0, 0, -1)
// Undefined.Implement with the following snippet:

Given('eyev ← {vector}', function (vector: tuple.vector) {
    this.eyev = vector;
});

Given(/eyev ← vector\(0, √2\/2, -√2\/2\)/, function () {
    this.eyev = new tuple.vector(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
});

Given(/eyev ← vector\(0, -√2\/2, -√2\/2\)/, function () {
    this.eyev = new tuple.vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
});

// ?And normalv ← vector(0, 0, -1)
// Undefined.Implement with the following snippet:

Given('normalv ← {vector}', function (vector: tuple.vector) {
    this.normalv = vector;
});

// ?And light ← point_light(point(0, 0, -10), color(1, 1, 1))
// Undefined.Implement with the following snippet:

Given('light ← {point_light}', function (lt: point_light) {
    this.light = lt;
});

// ?When result ← lighting(m, light, position, eyev, normalv)
// Undefined.Implement with the following snippet:

When(/result ← lighting\(m, light, position, eyev, normalv\)/, function () {
    this.result = lighting(this.m, this.light, this.position, this.eyev, this.normalv);
});

// ?Then result = color(1.9, 1.9, 1.9)
// Undefined.Implement with the following snippet:

Then('result = {Color}', function (Color: tuple.Color) {
    assert(tuple.isTupleEqual(this.result, Color));
});

//Chapter 7 worlds
// ? Given w ← world()
// Undefined. Implement with the following snippet:

Given(/w ← world\(\)/, function () {
    this.w = new World();
});

// ? Then w contains no objects
// Undefined. Implement with the following snippet:

Then('w contains no objects', function () {
    assert(this.w.objects.length == 0);
});

// ? And w has no light source
// Undefined. Implement with the following snippet:

Then('w has no light source', function () {
    assert(this.w.light == undefined);
});

Given(/s1 ← sphere\(\) with:/, function (dataTable) {
    //this.s1 = new Sphere(tuple.ORIGIN, )
});