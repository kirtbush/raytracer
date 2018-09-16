import assert = require('../../node_modules/assert-plus');
import { Given, When, Then } from "cucumber";
import * as common from "../common";
import * as tuple from "./tuple";
import * as canvas from "./canvas";
import * as matrices from "./matrices";
import * as transforms from "./transforms";

Given('a ← tuple: {float}, {float}, {float}, {float}', function (f1, f2, f3, f4) {
	
	this.a = new tuple.tuple(f1, f2, f3, f4);
});

Then('a.x = {float}', function (x) {
	
	assert(common.isEqualF(this.a.x, x));
});

Then('a.y = {float}', function (y) {
	
	assert(common.isEqualF(this.a.y, y));
});


Then('a.z = {float}', function (z) {
	
	assert(common.isEqualF(this.a.z, z));
});

Then('a.w = {float}', function (w) {
	
	assert(common.isEqualF(this.a.w, w));
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

Given(/p ← point: (.+),(.+),(.+)/, function (int1, int2, int3) {
	
	this.p = new tuple.point(int1, int2, int3);
});

Then(/p = tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
	
	assert(tuple.isTupleEqual(this.p, new tuple.tuple(int1, int2, int3, int4)));
});

Given(/v ← vector: (.+),(.+),(.+)/, function (int1, int2, int3) {
	
	this.v = new tuple.vector(int1, int2, int3);
});

Then(/v = tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
	
	assert(tuple.isTupleEqual(this.v, new tuple.tuple(int1, int2, int3, int4)));
});

//Floating point testing
Given('two values to compare {float}, {float}', function (float, float2) {
	
	this.float = float;
	this.float2 = float2;
});

Then('first = second', function () {
	assert(common.isEqualF(this.float, this.float2));
});

Then('first != second', function () {
	assert(!common.isEqualF(this.float, this.float2));
});

Given(/first ← tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
	this.a1 = new tuple.tuple(int1, int2, int3, int4)
});


Given(/second ← tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
	this.a2 = new tuple.tuple(int1, int2, int3, int4);
});


Then(/first plus second should equal tuple: (.+), (.+), (.+), (.+)/, function (int, int2, int3, int4) {
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

Given('p ← {point}', function (point) {
	this.p = point;
});

Given('v ← {vector}', function (vector) {
	this.v = vector;
});

Then('p - v = {point}', function (point) {
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

Given('zero ← {vector}', function (vector) {
	this.zero = vector;
});

Then('zero - v = {vector}', function (vector) {
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
	assert(common.isEqualF(tuple.magnitude(this.v), int1));
});

Then('{magnitude} = {sqrt}', function (mag, sqrt) {
	assert(common.isEqualF(tuple.magnitude(this.v), sqrt));
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
	
	assert(common.isEqualF(tuple.dot(this.a, this.b), int1));
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
	assert(common.isEqualF(this.c.red, float));
});

Then('c.green = {float}', function (float) {
	assert(common.isEqualF(this.c.green, float));
});

Then('c.blue = {float}', function (float) {
	assert(common.isEqualF(this.c.blue, float));
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

Then('c.width = {int}', function (int) {
	assert(this.c.width, int);
});

Then('c.height = {int}', function (int) {
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

When(/write_pixel\(c, (.+), (.+), red\)/, function (int, int2) {
	canvas.write_pixel(this.c, int, int2, this.red);
});

Then(/pixel_at\(c, (.+), (.+)\) = red/, function (int, int2) {
	assert(tuple.isTupleEqual(this.c.pixels[int][int2], this.red));
});

//ppm file creation
When('ppm ← {canvas_to_ppm}', function (canvas1) {
	this.ppm = canvas.canvas_to_ppm(this.c);
});

Then('lines {int}-{int} of ppm are', function (int, int2, docString) {
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

When('write_pixel: c, {int}, {int}, c1', function (int, int2) {
	canvas.write_pixel(this.c, int, int2, this.c1);
});

When('write_pixel: c, {int}, {int}, c2', function (int, int2) {
	canvas.write_pixel(this.c, int, int2, this.c2);
});

When('write_pixel: c, {int}, {int}, c3', function (int, int2) {
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
Given('the following {int}x{int} matrix M:', function (int, int2, dataTable) {
	this.M = matrices.copyFromRawTable(dataTable);
});


Then('M[{int},{int}] = {int}', function (int, int2, int3) {
	let first = this.M[int][int2];
	let second = int3;
	assert(first == second);
});

Then('M[{int},{int}] = {float}', function (int, int2, float) {
	assert(common.isEqualF(this.M[int][int2], float));
});

Then('the size of M is {int}', function (int) {
	assert(this.M.length == int);
});

Given('the following matrix A:', function (dataTable) {
	this.A = matrices.copyFromRawTable(dataTable);
});

Given('the following matrix B:', function (dataTable) {
	this.B = matrices.copyFromRawTable(dataTable);
});

Then('A * B is the following {int}x{int} matrix:', function (int, int2, dataTable) {
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

Given('the following {int}x{int} matrix A:', function (int, int2, dataTable) {
	this.A = matrices.copyFromRawTable(dataTable);
});

Then(/determinant\(A\) = (.+)/, function (int) {
	
	let determinant = this.A.determinant();
	assert(common.isEqualF(determinant, int));
});

Then(/submatrix\(A, (.+), (.+)\) is the following (.+)x(.+) matrix:/, function (int, int2, int3, int4, dataTable) {
	
	let subm = matrices.submatrix(this.A, int, int2);
	assert(subm.equals(matrices.copyFromRawTable(dataTable)));
});

Given(/B ← submatrix\(A, (.+), (.+)\)/, function (int, int2) {
	
	this.B = matrices.submatrix(this.A, int, int2);
});

Then(/determinant\(B\) = (.+)/, function (int) {
	
	assert(common.isEqualF(this.B.determinant(), int));
});

Then(/minor\(A, (.+), (.+)\) = (.+)/, function (int, int2, int3) {
	
	let minorVal = matrices.minor(this.A, int, int2)
	assert(common.isEqualF(minorVal, int3));
});

Then(/cofactor\(A, (.+), (.+)\) = (.+)/, function (int, int2, int3) {
	let cofo = matrices.cofactor(this.A, parseInt(int), parseInt(int2));
	assert(common.isEqualF(cofo, int3));
});

Then('A is invertible', function () {
	assert(this.A.isInvertible())
});

Given(/B ← inverse\(A\)/, function () {
	
	this.B = matrices.invert(this.A);
});

Then(/B\[(.+),(.+)\] = (.+)\/(.+)/, function (int, int2, int3, int4) {
	assert(common.isEqualF(this.B[int][int2], int3 / int4));
});

Then('A is not invertible', function () {
	assert(!this.A.isInvertible())
});

Then('B is the following {int}x{int} matrix:', function (int, int2, dataTable) {
	let dt = matrices.copyFromRawTable(dataTable);

	dt.print();
	this.B.print();

	assert(this.B.equals(dt));
});

Then(/inverse\(A\) is the following (.+)x(.+) matrix:/, function (int, int2, dataTable) {
	let invA = matrices.invert(this.A);
	let dtM = matrices.copyFromRawTable(dataTable);
	assert(invA.equals(dtM));
});


Given('the following {int}x{int} matrix B:', function (int, int2, dataTable) {
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
Given(/transform ← translation\((.+), (.+), (.+)\)/, function (int, int2,int3) {
	this.transform = transforms.translation(int, int2, int3);
});
Then('transform * p = {point}', function (point) {
	let resultP = this.transform.multiplyByTuple(this.p);
	assert(tuple.isTupleEqual(resultP, point));
});

Given(/inv ← inverse\(transform\)/, function () {
	this.inv = matrices.invert(this.transform);
});
Then('inv * p = {point}', function (point) {
	let invTrans = matrices.invert(this.transform);
	assert(this.inv.equals(invTrans));	
});

Then('transform * v = v', function () {
	let resultV = this.transform.multiplyByTuple(this.v);
	assert(tuple.isTupleEqual(resultV, this.v));
  });