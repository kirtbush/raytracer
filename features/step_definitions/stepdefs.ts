import assert = require('../../node_modules/assert-plus');
import { Given, When, Then } from "cucumber";
import { modulo, isEqualF, EPSILON } from "../common";
import * as tuple from "./tuple";
import * as canvas from "./canvas";
import * as matrices from "./matrices";
import * as transforms from "./transforms";
import { Ray } from "./rays";
import { Sphere } from "./spheres";
import { hit, Intersection, IntersectionArray } from "./intersections";

Given('a ← tuple: {float}, {float}, {float}, {float}', function(f1, f2, f3, f4) {

    this.a = new tuple.tuple(f1, f2, f3, f4);
});

Then('a.x = {float}', function(x) {

    assert(isEqualF(this.a.x, x));
});

Then('a.y = {float}', function(y) {

    assert(isEqualF(this.a.y, y));
});


Then('a.z = {float}', function(z) {

    assert(isEqualF(this.a.z, z));
});

Then('a.w = {float}', function(w) {

    assert(isEqualF(this.a.w, w));
});

Then('a is a point', function() {

    assert(tuple.isPoint(this.a));
});

Then('a is not a vector', function() {

    assert(!tuple.isVector(this.a));
});

Then('a is not a point', function() {

    assert(!tuple.isPoint(this.a));
});

Then('a is a vector', function() {

    assert(tuple.isVector(this.a));
});

Given(/p ← point: (.+),(.+),(.+)/, function(int1, int2, int3) {

    this.p = new tuple.point(int1, int2, int3);
});

Then(/p = tuple: (.+), (.+), (.+), (.+)/, function(int1, int2, int3, int4) {

    assert(tuple.isTupleEqual(this.p, new tuple.tuple(int1, int2, int3, int4)));
});

Given(/v ← vector: (.+),(.+),(.+)/, function(int1, int2, int3) {

    this.v = new tuple.vector(int1, int2, int3);
});

Then(/v = tuple: (.+), (.+), (.+), (.+)/, function(int1, int2, int3, int4) {

    assert(tuple.isTupleEqual(this.v, new tuple.tuple(int1, int2, int3, int4)));
});

//Floating point testing
Given('two values to compare {float}, {float}', function(float, float2) {

    this.float = float;
    this.float2 = float2;
});

Then('first = second', function() {
    assert(isEqualF(this.float, this.float2));
});

Then('first != second', function() {
    assert(!isEqualF(this.float, this.float2));
});

Given(/first ← tuple: (.+), (.+), (.+), (.+)/, function(int1, int2, int3, int4) {
    this.a1 = new tuple.tuple(int1, int2, int3, int4)
});


Given(/second ← tuple: (.+), (.+), (.+), (.+)/, function(int1, int2, int3, int4) {
    this.a2 = new tuple.tuple(int1, int2, int3, int4);
});


Then(/first plus second should equal tuple: (.+), (.+), (.+), (.+)/, function(int, int2, int3, int4) {
    let sumTuple = tuple.add(this.a1, this.a2);
    let inputTuple = new tuple.tuple(int, int2, int3, int4);
    assert(inputTuple, sumTuple);
});

Given("p{int} ← {point}", function(int1, pt) {
    this.p = this.p || [new tuple.point(0, 0, 0)];
    this.p[int1] = pt;
});

Then('p{int} - p{int} = {vector}', function(int1, int2, vector1) {
    let newVect = tuple.sub(this.p[int1], this.p[int2]);
    assert(tuple.isTupleEqual(newVect, vector1));
});

Given('p ← {point}', function(point) {
    this.p = point;
});

Given('v ← {vector}', function(vector) {
    this.v = vector;
});

Then('p - v = {point}', function(point) {
    let newPoint = tuple.sub(this.p, this.v);
    assert(tuple.isTupleEqual(newPoint, point));
});

Given('v{int} ← {vector}', function(int1, vector) {
    this.v = this.v || [new tuple.vector(0, 0, 0)];
    this.v[int1] = vector;
});

Then('v{int} - v{int} = {vector}', function(int1, int2, vector) {
    let newVect = tuple.sub(this.v[int1], this.v[int2]);
    assert(tuple.isTupleEqual(newVect, vector));
});

Given('zero ← {vector}', function(vector) {
    this.zero = vector;
});

Then('zero - v = {vector}', function(vector) {
    let resultVector = tuple.sub(this.zero, this.v);
    assert(tuple.isTupleEqual(resultVector, vector));
});

Given('a ← {tuple}', function(tuple1) {
    this.a = tuple1;
    //console.log(this.a);
});

Then('-a = {tuple}', function(tuple1) {
    //console.log(tuple1);
    assert(tuple.isTupleEqual(tuple.negate(this.a), tuple1));
});

//multiplication and division of scalars
Then('a * {float} = {tuple}', function(float1, tuple1) {

    assert(tuple.isTupleEqual(tuple.multiplyScalar(this.a, float1), tuple1));
});

Then("a \/ {int} = {tuple}", function(int1, tuple1) {
    let float1 = int1.toFixed(3);
    let newTuple = tuple.divideScalar(this.a, float1);
    assert(tuple.isTupleEqual(newTuple, tuple1));
});

//magnitude of vector
Then("{magnitude} = {int}", function(mag, int1) {
    assert(isEqualF(tuple.magnitude(this.v), int1));
});

Then('{magnitude} = {sqrt}', function(mag, sqrt) {
    assert(isEqualF(tuple.magnitude(this.v), sqrt));
});

//normalize vector
Then('{normalize} = {vector}', function(normalizer, vector1) {

    assert(tuple.isTupleEqual(tuple.normalize(this.v), vector1));
});

Then('{normalize} = approximately {vector}', function(normalize, vector1) {

    this.norm = tuple.normalize(vector1);
    assert(tuple.isTupleEqual(tuple.normalize(this.v), vector1))
});

When(/norm ← normalize\(v\)/, function() {

    this.norm = tuple.normalize(this.v);
});

Then('{magnitudenorm} = {int}', function(magnitudenorm, int1) {

    let mag = tuple.magnitude(this.norm);
    assert(mag == int1);
});

//dot product
Given('a ← {vector}', function(vector1) {

    this.a = vector1;
});
Given('b ← {vector}', function(vector1) {

    this.b = vector1;
});

Then('a dot b = {int}', function(int1) {

    assert(isEqualF(tuple.dot(this.a, this.b), int1));
});

Then('a cross b = {vector}', function(vector1) {
    assert(tuple.isTupleEqual(tuple.cross(this.a, this.b), vector1));
});

Then('b cross a = {vector}', function(vector1) {
    assert(tuple.isTupleEqual(tuple.cross(this.b, this.a), vector1));
});

Given('c ← {Color}', function(color1) {
    this.c = color1;
});

Then('c.red = {float}', function(float) {
    assert(isEqualF(this.c.red, float));
});

Then('c.green = {float}', function(float) {
    assert(isEqualF(this.c.green, float));
});

Then('c.blue = {float}', function(float) {
    assert(isEqualF(this.c.blue, float));
});

Given('c1 ← {Color}', function(Color1) {
    this.c1 = Color1;
});

Given('c2 ← {Color}', function(Color1) {
    this.c2 = Color1;
});

Given('c3 ← {Color}', function(Color1) {
    this.c3 = Color1;
});

Then('c1 + c2 = {Color}', function(Color1) {

    let newColor = tuple.add(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});

Then('c1 - c2 = {Color}', function(Color1) {
    let newColor = tuple.sub(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});

Then('c * {int} = {Color}', function(int, Color1) {
    let newColor = tuple.multiplyScalar(this.c, int);
    assert(tuple.isTupleEqual(newColor, Color1));
});

Then('c1 * c2 = {Color}', function(Color1) {
    let newColor = tuple.hadamard_product(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});

//CANVAS
Given('c ← {Canvas}', function(Canvas1) {
    this.c = Canvas1;
});

Then('c.width = {int}', function(int) {
    assert(this.c.width, int);
});

Then('c.height = {int}', function(int) {
    assert(this.c.height, int);
});

Then('every pixel of c is {Color}', function(Color) {
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

Given('red ← {Color}', function(Color) {
    this.red = Color;
});

When(/write_pixel\(c, (.+), (.+), red\)/, function(int, int2) {
    canvas.write_pixel(this.c, int, int2, this.red);
});

Then(/pixel_at\(c, (.+), (.+)\) = red/, function(int, int2) {
    assert(tuple.isTupleEqual(this.c.pixels[int][int2], this.red));
});

//ppm file creation
When('ppm ← {canvas_to_ppm}', function(canvas1) {
    this.ppm = canvas.canvas_to_ppm(this.c);
});

Then('lines {int}-{int} of ppm are', function(int, int2, docString) {
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

When('write_pixel: c, {int}, {int}, c1', function(int, int2) {
    canvas.write_pixel(this.c, int, int2, this.c1);
});

When('write_pixel: c, {int}, {int}, c2', function(int, int2) {
    canvas.write_pixel(this.c, int, int2, this.c2);
});

When('write_pixel: c, {int}, {int}, c3', function(int, int2) {
    canvas.write_pixel(this.c, int, int2, this.c3);
});

When('every pixel of c is set to {Color}', function(clr) {
    let x = 0, y = 0;
    for (y = 0; y < this.c.height; y++) {
        for (x = 0; x < this.c.width; x++) {
            canvas.write_pixel(this.c, x, y, clr);
        }
    }
});

Then('the last character of ppm is a newline', function() {
    this.ppm[this.ppm.length - 1] == "\n";
});

// Matrices
Given('the following {int}x{int} matrix M:', function(int, int2, dataTable) {
    this.M = matrices.copyFromRawTable(dataTable);
});


Then('M[{int},{int}] = {int}', function(int, int2, int3) {
    let first = this.M[int][int2];
    let second = int3;
    assert(first == second);
});

Then('M[{int},{int}] = {float}', function(int, int2, float) {
    assert(isEqualF(this.M[int][int2], float));
});

Then('the size of M is {int}', function(int) {
    assert(this.M.length == int);
});

Given('the following matrix A:', function(dataTable) {
    this.A = matrices.copyFromRawTable(dataTable);
});

Given('the following matrix B:', function(dataTable) {
    this.B = matrices.copyFromRawTable(dataTable);
});

Then('A * B is the following {int}x{int} matrix:', function(int, int2, dataTable) {
    let testMatrix = matrices.copyFromRawTable(dataTable);
    let resultMatrix = this.A.multiply(this.B);
    let success = testMatrix.equals(resultMatrix);
    assert(success);
});

Given('b ← {tuple}', function(tuple1) {

    this.b = tuple1;
});

Then('A * b = {tuple}', function(tuple1) {

    let resultTuple = this.A.multiplyByTuple(this.b);
    assert(tuple.isTupleEqual(resultTuple, tuple1));
});

Then('A * identity_matrix = A', function() {
    assert(this.A.equals(this.A.multiply(matrices.identity(this.A.length))));
});

Then('identity_matrix * a = a', function() {
    let resultTuple = matrices.identity(4).multiplyByTuple(this.a);
    assert(tuple.isTupleEqual(this.a, resultTuple));
});

Then('{transposedM} is the following matrix:', function(transposedM, dataTable) {
    //let something = eval("this."+transposedM);
    let something = matrices.copyFromRawTable(dataTable);
    let newA = matrices.transpose(this.A);
    assert(newA.equals(something));
    //this.transposedM.copyFromRawTable(dataTable); 
});

Given('A ← {transposedI}', function(transposedI) {

    this.A = matrices.transpose(matrices.identity(4));
});

Then('A = identity_matrix', function() {

    this.A.equals(matrices.identity(4));
});

Given('the following {int}x{int} matrix A:', function(int, int2, dataTable) {
    this.A = matrices.copyFromRawTable(dataTable);
});

Then(/determinant\(A\) = (.+)/, function(int) {

    let determinant = this.A.determinant();
    assert(isEqualF(determinant, int));
});

Then(/submatrix\(A, (.+), (.+)\) is the following (.+)x(.+) matrix:/, function(int, int2, int3, int4, dataTable) {

    let subm = matrices.submatrix(this.A, int, int2);
    assert(subm.equals(matrices.copyFromRawTable(dataTable)));
});

Given(/B ← submatrix\(A, (.+), (.+)\)/, function(int, int2) {

    this.B = matrices.submatrix(this.A, int, int2);
});

Then(/determinant\(B\) = (.+)/, function(int) {

    assert(isEqualF(this.B.determinant(), int));
});

Then(/minor\(A, (.+), (.+)\) = (.+)/, function(int, int2, int3) {

    let minorVal = matrices.minor(this.A, int, int2)
    assert(isEqualF(minorVal, int3));
});

Then(/cofactor\(A, (.+), (.+)\) = (.+)/, function(int, int2, int3) {
    let cofo = matrices.cofactor(this.A, parseInt(int), parseInt(int2));
    assert(isEqualF(cofo, int3));
});

Then('A is invertible', function() {
    assert(this.A.isInvertible())
});

Given(/B ← inverse\(A\)/, function() {

    this.B = matrices.invert(this.A);
});

Then(/B\[(.+),(.+)\] = (.+)\/(.+)/, function(int, int2, int3, int4) {
    assert(isEqualF(this.B[int][int2], int3 / int4));
});

Then('A is not invertible', function() {
    assert(!this.A.isInvertible())
});

Then('B is the following {int}x{int} matrix:', function(int, int2, dataTable) {
    let dt = matrices.copyFromRawTable(dataTable);

    assert(this.B.equals(dt));
});

Then(/inverse\(A\) is the following (.+)x(.+) matrix:/, function(int, int2, dataTable) {
    let invA = matrices.invert(this.A);
    let dtM = matrices.copyFromRawTable(dataTable);
    assert(invA.equals(dtM));
});


Given('the following {int}x{int} matrix B:', function(int, int2, dataTable) {
    this.B = matrices.copyFromRawTable(dataTable);
});

Given('C ← A * B', function() {
    this.C = this.A.multiply(this.B);
});

Then(/C \* inverse\(B\) = A/, function() {
    let bInverted = matrices.invert(this.B);
    let resultMatrix = this.C.multiply(bInverted);
    assert(resultMatrix.equals(this.A));
});

// Chapter 4 transformation and translation
Given(/transform ← translation\((.+), (.+), (.+)\)/, function(int, int2, int3) {
    this.transform = transforms.translation(int, int2, int3);
});
Then('transform * p = {point}', function(point) {
    let resultP = this.transform.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, point));
});

Given(/inv ← inverse\(transform\)/, function() {
    this.inv = matrices.invert(this.transform);
});
Then('inv * p = {point}', function(point) {
    let invTrans = matrices.invert(this.transform);
    assert(this.inv.equals(invTrans));
});

Then('transform * v = v', function() {
    let resultV = this.transform.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultV, this.v));
});

Given(/transform ← scaling\((.+), (.+), (.+)\)/, function(int, int2, int3) {
    this.transform = transforms.scaling(int, int2, int3);
});

Then('transform * v = {vector}', function(vector) {
    let resultTuple = this.transform.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultTuple, vector));
});

Then('inv * v = {vector}', function(vector) {
    let resultTuple = this.inv.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultTuple, vector));
});

Given(/half_quarter ← rotation_x\(π \/ (.+)\)/, function(int) {
    this.half_quarter = transforms.rotation_x(Math.PI / int);
});

Given(/full_quarter ← rotation_x\(π \/ (.+)\)/, function(int) {
    this.full_quarter = transforms.rotation_x(Math.PI / int);
});

// ? Then half_quarter * p = point(0, √2/2, √2/2)
// Undefined. Implement with the following snippet:

Then(/half_quarter \* p = point\(0, √2\/2, √2\/2\)/, function() {
    let pt = new tuple.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});

Then(/half_quarter \* p = point\(√2\/2, 0, √2\/2\)/, function() {
    let pt = new tuple.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});

// ? And full_quarter * p = point(0, 0, 1)
// Undefined. Implement with the following snippet:

Then('full_quarter * p = {point}', function(point) {
    let resultP = this.full_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, point));
});

Given('v ← {point}', function(point) {
    this.v = point;
});

// - And half_quarter ← rotation_x(π / 4) # features/step_definitions/stepdefs.js:405
// ? And inv ← inverse(half_quarter)
// Undefined. Implement with the following snippet:

Given(/inv ← inverse\(half_quarter\)/, function() {
    // Write code here that turns the phrase above into concrete actions
    this.inv = matrices.invert(this.half_quarter);
});

// ? Then inv * v = point(0, √2/2, -√2/2)
// Undefined. Implement with the following snippet:

Then(/inv \* v = point\((.+), (.+), (.+)\)/, function(int, int2, int3) {
    let pt = new tuple.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    let resultV = this.inv.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(pt, resultV));
});


Given(/half_quarter ← rotation_y\(π \/ (.+)\)/, function(int) {
    this.half_quarter = transforms.rotation_y(Math.PI / int);
});

// ? And full_quarter ← rotation_y(π / 2)
// Undefined. Implement with the following snippet:

Given(/full_quarter ← rotation_y\(π \/ (.+)\)/, function(int) {
    this.full_quarter = transforms.rotation_y(Math.PI / int);
});

// ? And half_quarter ← rotation_z(π / 4)
// Undefined. Implement with the following snippet:

Given(/half_quarter ← rotation_z\(π \/ (.+)\)/, function(int) {
    this.half_quarter = transforms.rotation_z(Math.PI / int);
});

// ? And full_quarter ← rotation_z(π / 2)
// Undefined. Implement with the following snippet:

Given(/full_quarter ← rotation_z\(π \/ (.+)\)/, function(int) {
    this.full_quarter = transforms.rotation_z(Math.PI / int);
});

// ? Then half_quarter * p = point(-√2/2, √2/2, 0)
// Undefined. Implement with the following snippet:

Then(/half_quarter \* p = point\(-√2\/2, √2\/2, 0\)/, function() {
    let pt = new tuple.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});

// ? Given transform ← shearing(1, 0, 0, 0, 0, 0)
// Undefined. Implement with the following snippet:

Given(/transform ← shearing\((.+), (.+), (.+), (.+), (.+), (.+)\)/, function(int, int2, int3, int4, int5, int6) {
    this.transform = transforms.shearing(int, int2, int3, int4, int5, int6);
});

//Chapter 5 rays and spheres
//   ? Given origin ← point(1, 2, 3)
//   Undefined. Implement with the following snippet:

Given('origin ← {point}', function(point) {
    this.origin = point;
});

// ? And direction ← vector(4, 5, 6)
//   Undefined. Implement with the following snippet:

Given('direction ← {vector}', function(vector) {
    this.direction = vector;
});

// ? When r ← ray(origin, direction)
//   Undefined. Implement with the following snippet:

When(/r ← ray\(origin, direction\)/, function() {
    this.r = new Ray(this.origin, this.direction);
});

// ? Then r.origin = origin
//   Undefined. Implement with the following snippet:

Then('r.origin = origin', function() {
    assert(tuple.isTupleEqual(this.r.origin, this.origin))
});

// ? And r.direction = direction
//   Undefined. Implement with the following snippet:

Then('r.direction = direction', function() {
    assert(tuple.isTupleEqual(this.r.direction, this.direction))
});

// ? Given r ← ray(point(2, 3, 4), vector(1, 0, 0))
// Undefined. Implement with the following snippet:

Given('r ← {ray}', function(ray) {
    this.r = ray;
});

// ? Then position(r, 0) = point(2, 3, 4)
// Undefined. Implement with the following snippet:

Then('{position} = {point}', function(pos, point) {
    let newPos = this.r.position(pos);
    assert(newPos, point);
});

//Spheres
Given(/s ← sphere\(\)/, function() {
    // Write code here that turns the phrase above into concrete actions
    this.s = new Sphere(new tuple.point(0, 0, 0), 0);
});

// ? When xs ← intersect(s, r)
// Undefined. Implement with the following snippet:

When(/xs ← intersect\(s, r\)/, function() {
    // Write code here that turns the phrase above into concrete actions
    this.xs = [];
    this.xs = this.s.intersects(this.r);
});

// ? Then xs.count = 2
// Undefined. Implement with the following snippet:

Then('xs.count = {int}', function(int) {
    assert(isEqualF(this.xs.length, int));
});

// ? And xs[0] = 4
// Undefined. Implement with the following snippet:

Then('xs[{int}] = {int}', function(int: number, int2: number) {
    assert(isEqualF(this.xs[int].t, int2));
});

//intersections
When(/i ← intersection\(([-]?\d+\.?\d*), s\)/, function(float: number) {
    this.i = new Intersection(float, this.s);
});

//   ? Then i.t = 3.5
//   Undefined. Implement with the following snippet:

Then('i.t = {float}', function(float) {
    assert(isEqualF(this.i.t, float));
});

// ? And i.object = s
//   Undefined. Implement with the following snippet:

Then('i.object = s', function() {
    assert(this.i.object===this.s);
});

// ?And i1 ← intersection(1, s)
// Undefined.Implement with the following snippet:

Given(/i([-]?\d+\.?\d*) ← intersection\(([-]?\d+\.?\d*), s\)/, function(int, int2) {
    this.i = this.i || [];
    this.i[int] = new Intersection(int2, this.s);
});

// ?When xs ← intersections(i1, i2)
// Undefined.Implement with the following snippet:

When(/xs ← intersections\(i([-]?\d+\.?\d*), i([-]?\d+\.?\d*)\)/, function(int, int2) {
    this.xs = [];
    this.xs = new IntersectionArray([this.i[int], this.i[int2]]);
});

// - Then xs.count = 2 # features\step_definitions\stepdefs.js: 530
//     ? And xs[0].t = 1
// Undefined.Implement with the following snippet:

Then('xs[{int}].t = {int}', function(int, int2) {
    assert(isEqualF(this.xs[int].t,int2));
});

Then('xs[{int}].object = s', function (int) {
    assert(this.xs[int].object==this.s);
  });

  //hits
  When(/h ← hit\(xs\)/, function () {
    this.h = hit(this.xs);
  });

  Then('h = i{int}', function (int) {
    assert(this.h.equals(this.i[int]));
  });

  Then('h is nothing', function () {
    assert(this.h==null);
  });

  Given(/xs ← intersections\(i(\d+), i(\d+), i(\d+), i(\d+)\)/, function (int, int2, int3, int4) {
    this.xs = new IntersectionArray([this.i[int], this.i[int2], this.i[int3], this.i[int4]]);

  });