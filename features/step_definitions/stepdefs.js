const assert = require('assert');
const { Given, When, Then } = require('cucumber');
let common = require("../common");
let tuple = require("./tuple");
//let Tuple = tuple.Tuple;
//let Point = tuple.Point;
//let Vector = tuple.Vector;


Given('a ← tuple: {float}, {float}, {float}, {float}', function (f1, f2, f3, f4) {
	// Write code here that turns the phrase above into concrete actions
	this.a = new tuple.tuple(f1, f2, f3, f4);
});

Then('a.x = {float}', function (x) {
	// Write code here that turns the phrase above into concrete actions
	assert(common.isEqualF(this.a.x, x));
});

Then('a.y = {float}', function (y) {
	// Write code here that turns the phrase above into concrete actions
	assert(common.isEqualF(this.a.y, y));
});


Then('a.z = {float}', function (z) {
	// Write code here that turns the phrase above into concrete actions
	assert(common.isEqualF(this.a.z, z));
});

Then('a.w = {float}', function (w) {
	// Write code here that turns the phrase above into concrete actions
	assert(common.isEqualF(this.a.w, w));
});

Then('a is a point', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(tuple.isPoint(this.a));
});

Then('a is not a vector', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(!tuple.isVector(this.a));
});

Then('a is not a point', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(!tuple.isPoint(this.a));
});

Then('a is a vector', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(tuple.isVector(this.a));
});

Given(/p ← point: (.+),(.+),(.+)/, function (int1, int2, int3) {
	// Write code here that turns the phrase above into concrete actions
	this.p = new tuple.point(int1, int2, int3);
});

Then(/p = tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
	// Write code here that turns the phrase above into concrete actions
	assert(tuple.isTupleEqual(this.p, new tuple.tuple(int1, int2, int3, int4)));
});

Given(/v ← vector: (.+),(.+),(.+)/, function (int1, int2, int3) {
	// Write code here that turns the phrase above into concrete actions
	this.v = new tuple.vector(int1, int2, int3);
});

Then(/v = tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
	// Write code here that turns the phrase above into concrete actions
	assert(tuple.isTupleEqual(this.v, new tuple.tuple(int1, int2, int3, int4)));
});

//Floating point testing
Given('two values to compare {float}, {float}', function (float, float2) {
	// Write code here that turns the phrase above into concrete actions
	this.float = float;
	this.float2 = float2;
});

Then('first = second', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(common.isEqualF(this.float, this.float2));
});

Then('first != second', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(!common.isEqualF(this.float, this.float2));
});

Given(/first ← tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
this.a1 = new tuple.tuple(int1, int2, int3, int4)
});


Given(/second ← tuple: (.+), (.+), (.+), (.+)/, function (int1, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
this.a2 = new tuple.tuple(int1, int2, int3, int4);
});


Then(/first plus second should equal tuple: (.+), (.+), (.+), (.+)/, function (int, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
let sumTuple = tuple.add(this.a1, this.a2);
let inputTuple = new tuple.tuple(int, int2, int3, int4);
assert(inputTuple, sumTuple);
});

// 1) Scenario: Subtracting two points # features\tuples.feature:54
//    ? Given p1 ← point(3, 2, 1)
//        Undefined. Implement with the following snippet:

Given(/(.+)? ← point\((.+), (.+), (.+)\)/, function (int, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//    ? And p2 ← point(5, 6, 7)
//        Undefined. Implement with the following snippet:

Given('p{int} ← point\({int}, {int}, {int})', function (int, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//    ? Then p1 - p2 = vector(-2, -4, -6)
//        Undefined. Implement with the following snippet:

Then('p{int} - p{int} = vector\({int}, {int}, {int})', function (int, int2, int3, int4, int5) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});


// 2) Scenario: Subtracting a vector from a point # features\tuples.feature:59
//    ? Given p ← point(3, 2, 1)
//        Undefined. Implement with the following snippet:

Given('p ← point\({int}, {int}, {int})', function (int, int2, int3) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//    ? And v ← vector(5, 6, 7)
//        Undefined. Implement with the following snippet:

Given('v ← vector\({int}, {int}, {int})', function (int, int2, int3) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//    ? Then p - v = point(-2, -4, -6)
//        Undefined. Implement with the following snippet:

Then('p - v = point\({int}, {int}, {int})', function (int, int2, int3) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});


// 3) Scenario: Subtracting two vectors # features\tuples.feature:64
//    ? Given v1 ← vector(3, 2, 1)
//        Undefined. Implement with the following snippet:

Given('v{int} ← vector\({int}, {int}, {int})', function (int, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//    ? And v2 ← vector(5, 6, 7)
//        Undefined. Implement with the following snippet:

Given('v{int} ← vector\({int}, {int}, {int})', function (int, int2, int3, int4) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//    ? Then v1 - v2 = vector(-2, -4, -6)
//        Undefined. Implement with the following snippet:

Then('v{int} - v{int} = vector\({int}, {int}, {int})', function (int, int2, int3, int4, int5) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});
