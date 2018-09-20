"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("../../node_modules/assert-plus");
const cucumber_1 = require("cucumber");
const common = require("../common");
const tuple = require("./tuple");
const canvas = require("./canvas");
const matrices = require("./matrices");
const transforms = require("./transforms");
const rays_1 = require("./rays");
const spheres_1 = require("./spheres");
cucumber_1.Given('a ← tuple: {float}, {float}, {float}, {float}', function (f1, f2, f3, f4) {
    this.a = new tuple.tuple(f1, f2, f3, f4);
});
cucumber_1.Then('a.x = {float}', function (x) {
    assert(common.isEqualF(this.a.x, x));
});
cucumber_1.Then('a.y = {float}', function (y) {
    assert(common.isEqualF(this.a.y, y));
});
cucumber_1.Then('a.z = {float}', function (z) {
    assert(common.isEqualF(this.a.z, z));
});
cucumber_1.Then('a.w = {float}', function (w) {
    assert(common.isEqualF(this.a.w, w));
});
cucumber_1.Then('a is a point', function () {
    assert(tuple.isPoint(this.a));
});
cucumber_1.Then('a is not a vector', function () {
    assert(!tuple.isVector(this.a));
});
cucumber_1.Then('a is not a point', function () {
    assert(!tuple.isPoint(this.a));
});
cucumber_1.Then('a is a vector', function () {
    assert(tuple.isVector(this.a));
});
cucumber_1.Given(/p ← point: (.+),(.+),(.+)/, function (int1, int2, int3) {
    this.p = new tuple.point(int1, int2, int3);
});
cucumber_1.Then(/p = tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
    assert(tuple.isTupleEqual(this.p, new tuple.tuple(int1, int2, int3, int4)));
});
cucumber_1.Given(/v ← vector: (.+),(.+),(.+)/, function (int1, int2, int3) {
    this.v = new tuple.vector(int1, int2, int3);
});
cucumber_1.Then(/v = tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
    assert(tuple.isTupleEqual(this.v, new tuple.tuple(int1, int2, int3, int4)));
});
//Floating point testing
cucumber_1.Given('two values to compare {float}, {float}', function (float, float2) {
    this.float = float;
    this.float2 = float2;
});
cucumber_1.Then('first = second', function () {
    assert(common.isEqualF(this.float, this.float2));
});
cucumber_1.Then('first != second', function () {
    assert(!common.isEqualF(this.float, this.float2));
});
cucumber_1.Given(/first ← tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
    this.a1 = new tuple.tuple(int1, int2, int3, int4);
});
cucumber_1.Given(/second ← tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
    this.a2 = new tuple.tuple(int1, int2, int3, int4);
});
cucumber_1.Then(/first plus second should equal tuple: (.+), (.+), (.+), (.+)/, function (int, int2, int3, int4) {
    let sumTuple = tuple.add(this.a1, this.a2);
    let inputTuple = new tuple.tuple(int, int2, int3, int4);
    assert(inputTuple, sumTuple);
});
cucumber_1.Given("p{int} ← {point}", function (int1, pt) {
    this.p = this.p || [new tuple.point(0, 0, 0)];
    this.p[int1] = pt;
});
cucumber_1.Then('p{int} - p{int} = {vector}', function (int1, int2, vector1) {
    let newVect = tuple.sub(this.p[int1], this.p[int2]);
    assert(tuple.isTupleEqual(newVect, vector1));
});
cucumber_1.Given('p ← {point}', function (point) {
    this.p = point;
});
cucumber_1.Given('v ← {vector}', function (vector) {
    this.v = vector;
});
cucumber_1.Then('p - v = {point}', function (point) {
    let newPoint = tuple.sub(this.p, this.v);
    assert(tuple.isTupleEqual(newPoint, point));
});
cucumber_1.Given('v{int} ← {vector}', function (int1, vector) {
    this.v = this.v || [new tuple.vector(0, 0, 0)];
    this.v[int1] = vector;
});
cucumber_1.Then('v{int} - v{int} = {vector}', function (int1, int2, vector) {
    let newVect = tuple.sub(this.v[int1], this.v[int2]);
    assert(tuple.isTupleEqual(newVect, vector));
});
cucumber_1.Given('zero ← {vector}', function (vector) {
    this.zero = vector;
});
cucumber_1.Then('zero - v = {vector}', function (vector) {
    let resultVector = tuple.sub(this.zero, this.v);
    assert(tuple.isTupleEqual(resultVector, vector));
});
cucumber_1.Given('a ← {tuple}', function (tuple1) {
    this.a = tuple1;
    //console.log(this.a);
});
cucumber_1.Then('-a = {tuple}', function (tuple1) {
    //console.log(tuple1);
    assert(tuple.isTupleEqual(tuple.negate(this.a), tuple1));
});
//multiplication and division of scalars
cucumber_1.Then('a * {float} = {tuple}', function (float1, tuple1) {
    assert(tuple.isTupleEqual(tuple.multiplyScalar(this.a, float1), tuple1));
});
cucumber_1.Then("a \/ {int} = {tuple}", function (int1, tuple1) {
    let float1 = int1.toFixed(3);
    let newTuple = tuple.divideScalar(this.a, float1);
    assert(tuple.isTupleEqual(newTuple, tuple1));
});
//magnitude of vector
cucumber_1.Then("{magnitude} = {int}", function (mag, int1) {
    assert(common.isEqualF(tuple.magnitude(this.v), int1));
});
cucumber_1.Then('{magnitude} = {sqrt}', function (mag, sqrt) {
    assert(common.isEqualF(tuple.magnitude(this.v), sqrt));
});
//normalize vector
cucumber_1.Then('{normalize} = {vector}', function (normalizer, vector1) {
    assert(tuple.isTupleEqual(tuple.normalize(this.v), vector1));
});
cucumber_1.Then('{normalize} = approximately {vector}', function (normalize, vector1) {
    this.norm = tuple.normalize(vector1);
    assert(tuple.isTupleEqual(tuple.normalize(this.v), vector1));
});
cucumber_1.When(/norm ← normalize\(v\)/, function () {
    this.norm = tuple.normalize(this.v);
});
cucumber_1.Then('{magnitudenorm} = {int}', function (magnitudenorm, int1) {
    let mag = tuple.magnitude(this.norm);
    assert(mag == int1);
});
//dot product
cucumber_1.Given('a ← {vector}', function (vector1) {
    this.a = vector1;
});
cucumber_1.Given('b ← {vector}', function (vector1) {
    this.b = vector1;
});
cucumber_1.Then('a dot b = {int}', function (int1) {
    assert(common.isEqualF(tuple.dot(this.a, this.b), int1));
});
cucumber_1.Then('a cross b = {vector}', function (vector1) {
    assert(tuple.isTupleEqual(tuple.cross(this.a, this.b), vector1));
});
cucumber_1.Then('b cross a = {vector}', function (vector1) {
    assert(tuple.isTupleEqual(tuple.cross(this.b, this.a), vector1));
});
cucumber_1.Given('c ← {Color}', function (color1) {
    this.c = color1;
});
cucumber_1.Then('c.red = {float}', function (float) {
    assert(common.isEqualF(this.c.red, float));
});
cucumber_1.Then('c.green = {float}', function (float) {
    assert(common.isEqualF(this.c.green, float));
});
cucumber_1.Then('c.blue = {float}', function (float) {
    assert(common.isEqualF(this.c.blue, float));
});
cucumber_1.Given('c1 ← {Color}', function (Color1) {
    this.c1 = Color1;
});
cucumber_1.Given('c2 ← {Color}', function (Color1) {
    this.c2 = Color1;
});
cucumber_1.Given('c3 ← {Color}', function (Color1) {
    this.c3 = Color1;
});
cucumber_1.Then('c1 + c2 = {Color}', function (Color1) {
    let newColor = tuple.add(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});
cucumber_1.Then('c1 - c2 = {Color}', function (Color1) {
    let newColor = tuple.sub(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});
cucumber_1.Then('c * {int} = {Color}', function (int, Color1) {
    let newColor = tuple.multiplyScalar(this.c, int);
    assert(tuple.isTupleEqual(newColor, Color1));
});
cucumber_1.Then('c1 * c2 = {Color}', function (Color1) {
    let newColor = tuple.hadamard_product(this.c1, this.c2);
    assert(tuple.isTupleEqual(newColor, Color1));
});
//CANVAS
cucumber_1.Given('c ← {Canvas}', function (Canvas1) {
    this.c = Canvas1;
});
cucumber_1.Then('c.width = {int}', function (int) {
    assert(this.c.width, int);
});
cucumber_1.Then('c.height = {int}', function (int) {
    assert(this.c.height, int);
});
cucumber_1.Then('every pixel of c is {Color}', function (Color) {
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
cucumber_1.Given('red ← {Color}', function (Color) {
    this.red = Color;
});
cucumber_1.When(/write_pixel\(c, (.+), (.+), red\)/, function (int, int2) {
    canvas.write_pixel(this.c, int, int2, this.red);
});
cucumber_1.Then(/pixel_at\(c, (.+), (.+)\) = red/, function (int, int2) {
    assert(tuple.isTupleEqual(this.c.pixels[int][int2], this.red));
});
//ppm file creation
cucumber_1.When('ppm ← {canvas_to_ppm}', function (canvas1) {
    this.ppm = canvas.canvas_to_ppm(this.c);
});
cucumber_1.Then('lines {int}-{int} of ppm are', function (int, int2, docString) {
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
cucumber_1.When('write_pixel: c, {int}, {int}, c1', function (int, int2) {
    canvas.write_pixel(this.c, int, int2, this.c1);
});
cucumber_1.When('write_pixel: c, {int}, {int}, c2', function (int, int2) {
    canvas.write_pixel(this.c, int, int2, this.c2);
});
cucumber_1.When('write_pixel: c, {int}, {int}, c3', function (int, int2) {
    canvas.write_pixel(this.c, int, int2, this.c3);
});
cucumber_1.When('every pixel of c is set to {Color}', function (clr) {
    let x = 0, y = 0;
    for (y = 0; y < this.c.height; y++) {
        for (x = 0; x < this.c.width; x++) {
            canvas.write_pixel(this.c, x, y, clr);
        }
    }
});
cucumber_1.Then('the last character of ppm is a newline', function () {
    this.ppm[this.ppm.length - 1] == "\n";
});
// Matrices
cucumber_1.Given('the following {int}x{int} matrix M:', function (int, int2, dataTable) {
    this.M = matrices.copyFromRawTable(dataTable);
});
cucumber_1.Then('M[{int},{int}] = {int}', function (int, int2, int3) {
    let first = this.M[int][int2];
    let second = int3;
    assert(first == second);
});
cucumber_1.Then('M[{int},{int}] = {float}', function (int, int2, float) {
    assert(common.isEqualF(this.M[int][int2], float));
});
cucumber_1.Then('the size of M is {int}', function (int) {
    assert(this.M.length == int);
});
cucumber_1.Given('the following matrix A:', function (dataTable) {
    this.A = matrices.copyFromRawTable(dataTable);
});
cucumber_1.Given('the following matrix B:', function (dataTable) {
    this.B = matrices.copyFromRawTable(dataTable);
});
cucumber_1.Then('A * B is the following {int}x{int} matrix:', function (int, int2, dataTable) {
    let testMatrix = matrices.copyFromRawTable(dataTable);
    let resultMatrix = this.A.multiply(this.B);
    let success = testMatrix.equals(resultMatrix);
    assert(success);
});
cucumber_1.Given('b ← {tuple}', function (tuple1) {
    this.b = tuple1;
});
cucumber_1.Then('A * b = {tuple}', function (tuple1) {
    let resultTuple = this.A.multiplyByTuple(this.b);
    assert(tuple.isTupleEqual(resultTuple, tuple1));
});
cucumber_1.Then('A * identity_matrix = A', function () {
    assert(this.A.equals(this.A.multiply(matrices.identity(this.A.length))));
});
cucumber_1.Then('identity_matrix * a = a', function () {
    let resultTuple = matrices.identity(4).multiplyByTuple(this.a);
    assert(tuple.isTupleEqual(this.a, resultTuple));
});
cucumber_1.Then('{transposedM} is the following matrix:', function (transposedM, dataTable) {
    //let something = eval("this."+transposedM);
    let something = matrices.copyFromRawTable(dataTable);
    let newA = matrices.transpose(this.A);
    assert(newA.equals(something));
    //this.transposedM.copyFromRawTable(dataTable); 
});
cucumber_1.Given('A ← {transposedI}', function (transposedI) {
    this.A = matrices.transpose(matrices.identity(4));
});
cucumber_1.Then('A = identity_matrix', function () {
    this.A.equals(matrices.identity(4));
});
cucumber_1.Given('the following {int}x{int} matrix A:', function (int, int2, dataTable) {
    this.A = matrices.copyFromRawTable(dataTable);
});
cucumber_1.Then(/determinant\(A\) = (.+)/, function (int) {
    let determinant = this.A.determinant();
    assert(common.isEqualF(determinant, int));
});
cucumber_1.Then(/submatrix\(A, (.+), (.+)\) is the following (.+)x(.+) matrix:/, function (int, int2, int3, int4, dataTable) {
    let subm = matrices.submatrix(this.A, int, int2);
    assert(subm.equals(matrices.copyFromRawTable(dataTable)));
});
cucumber_1.Given(/B ← submatrix\(A, (.+), (.+)\)/, function (int, int2) {
    this.B = matrices.submatrix(this.A, int, int2);
});
cucumber_1.Then(/determinant\(B\) = (.+)/, function (int) {
    assert(common.isEqualF(this.B.determinant(), int));
});
cucumber_1.Then(/minor\(A, (.+), (.+)\) = (.+)/, function (int, int2, int3) {
    let minorVal = matrices.minor(this.A, int, int2);
    assert(common.isEqualF(minorVal, int3));
});
cucumber_1.Then(/cofactor\(A, (.+), (.+)\) = (.+)/, function (int, int2, int3) {
    let cofo = matrices.cofactor(this.A, parseInt(int), parseInt(int2));
    assert(common.isEqualF(cofo, int3));
});
cucumber_1.Then('A is invertible', function () {
    assert(this.A.isInvertible());
});
cucumber_1.Given(/B ← inverse\(A\)/, function () {
    this.B = matrices.invert(this.A);
});
cucumber_1.Then(/B\[(.+),(.+)\] = (.+)\/(.+)/, function (int, int2, int3, int4) {
    assert(common.isEqualF(this.B[int][int2], int3 / int4));
});
cucumber_1.Then('A is not invertible', function () {
    assert(!this.A.isInvertible());
});
cucumber_1.Then('B is the following {int}x{int} matrix:', function (int, int2, dataTable) {
    let dt = matrices.copyFromRawTable(dataTable);
    assert(this.B.equals(dt));
});
cucumber_1.Then(/inverse\(A\) is the following (.+)x(.+) matrix:/, function (int, int2, dataTable) {
    let invA = matrices.invert(this.A);
    let dtM = matrices.copyFromRawTable(dataTable);
    assert(invA.equals(dtM));
});
cucumber_1.Given('the following {int}x{int} matrix B:', function (int, int2, dataTable) {
    this.B = matrices.copyFromRawTable(dataTable);
});
cucumber_1.Given('C ← A * B', function () {
    this.C = this.A.multiply(this.B);
});
cucumber_1.Then(/C \* inverse\(B\) = A/, function () {
    let bInverted = matrices.invert(this.B);
    let resultMatrix = this.C.multiply(bInverted);
    assert(resultMatrix.equals(this.A));
});
// Chapter 4 transformation and translation
cucumber_1.Given(/transform ← translation\((.+), (.+), (.+)\)/, function (int, int2, int3) {
    this.transform = transforms.translation(int, int2, int3);
});
cucumber_1.Then('transform * p = {point}', function (point) {
    let resultP = this.transform.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, point));
});
cucumber_1.Given(/inv ← inverse\(transform\)/, function () {
    this.inv = matrices.invert(this.transform);
});
cucumber_1.Then('inv * p = {point}', function (point) {
    let invTrans = matrices.invert(this.transform);
    assert(this.inv.equals(invTrans));
});
cucumber_1.Then('transform * v = v', function () {
    let resultV = this.transform.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultV, this.v));
});
cucumber_1.Given(/transform ← scaling\((.+), (.+), (.+)\)/, function (int, int2, int3) {
    this.transform = transforms.scaling(int, int2, int3);
});
cucumber_1.Then('transform * v = {vector}', function (vector) {
    let resultTuple = this.transform.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultTuple, vector));
});
cucumber_1.Then('inv * v = {vector}', function (vector) {
    let resultTuple = this.inv.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(resultTuple, vector));
});
cucumber_1.Given(/half_quarter ← rotation_x\(π \/ (.+)\)/, function (int) {
    this.half_quarter = transforms.rotation_x(Math.PI / int);
});
cucumber_1.Given(/full_quarter ← rotation_x\(π \/ (.+)\)/, function (int) {
    this.full_quarter = transforms.rotation_x(Math.PI / int);
});
// ? Then half_quarter * p = point(0, √2/2, √2/2)
// Undefined. Implement with the following snippet:
cucumber_1.Then(/half_quarter \* p = point\(0, √2\/2, √2\/2\)/, function () {
    let pt = new tuple.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});
cucumber_1.Then(/half_quarter \* p = point\(√2\/2, 0, √2\/2\)/, function () {
    let pt = new tuple.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});
// ? And full_quarter * p = point(0, 0, 1)
// Undefined. Implement with the following snippet:
cucumber_1.Then('full_quarter * p = {point}', function (point) {
    let resultP = this.full_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, point));
});
cucumber_1.Given('v ← {point}', function (point) {
    this.v = point;
});
// - And half_quarter ← rotation_x(π / 4) # features/step_definitions/stepdefs.js:405
// ? And inv ← inverse(half_quarter)
// Undefined. Implement with the following snippet:
cucumber_1.Given(/inv ← inverse\(half_quarter\)/, function () {
    // Write code here that turns the phrase above into concrete actions
    this.inv = matrices.invert(this.half_quarter);
});
// ? Then inv * v = point(0, √2/2, -√2/2)
// Undefined. Implement with the following snippet:
cucumber_1.Then(/inv \* v = point\((.+), (.+), (.+)\)/, function (int, int2, int3) {
    let pt = new tuple.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    let resultV = this.inv.multiplyByTuple(this.v);
    assert(tuple.isTupleEqual(pt, resultV));
});
cucumber_1.Given(/half_quarter ← rotation_y\(π \/ (.+)\)/, function (int) {
    this.half_quarter = transforms.rotation_y(Math.PI / int);
});
// ? And full_quarter ← rotation_y(π / 2)
// Undefined. Implement with the following snippet:
cucumber_1.Given(/full_quarter ← rotation_y\(π \/ (.+)\)/, function (int) {
    this.full_quarter = transforms.rotation_y(Math.PI / int);
});
// ? And half_quarter ← rotation_z(π / 4)
// Undefined. Implement with the following snippet:
cucumber_1.Given(/half_quarter ← rotation_z\(π \/ (.+)\)/, function (int) {
    this.half_quarter = transforms.rotation_z(Math.PI / int);
});
// ? And full_quarter ← rotation_z(π / 2)
// Undefined. Implement with the following snippet:
cucumber_1.Given(/full_quarter ← rotation_z\(π \/ (.+)\)/, function (int) {
    this.full_quarter = transforms.rotation_z(Math.PI / int);
});
// ? Then half_quarter * p = point(-√2/2, √2/2, 0)
// Undefined. Implement with the following snippet:
cucumber_1.Then(/half_quarter \* p = point\(-√2\/2, √2\/2, 0\)/, function () {
    let pt = new tuple.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    let resultP = this.half_quarter.multiplyByTuple(this.p);
    assert(tuple.isTupleEqual(resultP, pt));
});
// ? Given transform ← shearing(1, 0, 0, 0, 0, 0)
// Undefined. Implement with the following snippet:
cucumber_1.Given(/transform ← shearing\((.+), (.+), (.+), (.+), (.+), (.+)\)/, function (int, int2, int3, int4, int5, int6) {
    this.transform = transforms.shearing(int, int2, int3, int4, int5, int6);
});
//Chapter 5 rays and spheres
//   ? Given origin ← point(1, 2, 3)
//   Undefined. Implement with the following snippet:
cucumber_1.Given('origin ← {point}', function (point) {
    this.origin = point;
});
// ? And direction ← vector(4, 5, 6)
//   Undefined. Implement with the following snippet:
cucumber_1.Given('direction ← {vector}', function (vector) {
    this.direction = vector;
});
// ? When r ← ray(origin, direction)
//   Undefined. Implement with the following snippet:
cucumber_1.When(/r ← ray\(origin, direction\)/, function () {
    this.r = new rays_1.Ray(this.origin, this.direction);
});
// ? Then r.origin = origin
//   Undefined. Implement with the following snippet:
cucumber_1.Then('r.origin = origin', function () {
    assert(tuple.isTupleEqual(this.r.origin, this.origin));
});
// ? And r.direction = direction
//   Undefined. Implement with the following snippet:
cucumber_1.Then('r.direction = direction', function () {
    assert(tuple.isTupleEqual(this.r.direction, this.direction));
});
// ? Given r ← ray(point(2, 3, 4), vector(1, 0, 0))
// Undefined. Implement with the following snippet:
cucumber_1.Given('r ← {ray}', function (ray) {
    this.r = ray;
});
// ? Then position(r, 0) = point(2, 3, 4)
// Undefined. Implement with the following snippet:
cucumber_1.Then('{position} = {point}', function (pos, point) {
    let newPos = this.r.position(pos);
    assert(newPos, point);
});
//Spheres
cucumber_1.Given(/s ← sphere\(\)/, function () {
    // Write code here that turns the phrase above into concrete actions
    this.s = new spheres_1.Sphere(new tuple.point(0, 0, 0), 0);
});
// ? When xs ← intersect(s, r)
// Undefined. Implement with the following snippet:
cucumber_1.When('xs ← intersect\(s, r\)', function () {
    // Write code here that turns the phrase above into concrete actions
    this.xs = this.xs || [];
    this.xs = spheres_1.Sphere.intersects(this.s, this.r);
});
// ? Then xs.count = 2
// Undefined. Implement with the following snippet:
cucumber_1.Then('xs.count = {int}', function (int) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
// ? And xs[0] = 4
// Undefined. Implement with the following snippet:
cucumber_1.Then('xs[{int}] = {int}', function (int, int2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
// ? And xs[1] = 6
// Undefined. Implement with the following snippet:
cucumber_1.Then('xs[{int}] = {int}', function (int, int2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
//# sourceMappingURL=stepdefs.js.map