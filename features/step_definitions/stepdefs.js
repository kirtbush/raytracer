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
	this.p = this.p || [tuple.point(0,0,0)];
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
	this.v = this.v || [tuple.vector(0,0,0)];
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