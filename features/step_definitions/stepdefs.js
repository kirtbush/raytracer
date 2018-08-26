const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given('a ← tuple: {float}, {float}, {float}, {float}', function (f1, f2, f3, f4) {
	// Write code here that turns the phrase above into concrete actions
	this.a = new tuple(f1, f2, f3, f4);
});

Then('a.x = {float}', function (x) {
	// Write code here that turns the phrase above into concrete actions
	assert(isEqualF(this.a.x, x));
});

Then('a.y = {float}', function (y) {
	// Write code here that turns the phrase above into concrete actions
	assert(isEqualF(this.a.y, y));
});


Then('a.z = {float}', function (z) {
	// Write code here that turns the phrase above into concrete actions
	assert(isEqualF(this.a.z, z));
});

Then('a.w = {float}', function (w) {
	// Write code here that turns the phrase above into concrete actions
	assert(isEqualF(this.a.w, w));
});

Then('a is a point', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(isPoint(this.a));
});

Then('a is not a vector', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(!isVector(this.a));
});

Then('a is not a point', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(!isPoint(this.a));
});

Then('a is a vector', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(isVector(this.a));
});

Given('p ← point: {int},{int},{int}', function (int1, int2, int3) {
	// Write code here that turns the phrase above into concrete actions
	this.p = new point(int1, int2, int3);
});

Then('p = tuple: {int}, {int}, {int}, {int}', function (int1, int2, int3, int4) {
	// Write code here that turns the phrase above into concrete actions
	assert(isTupleEqual(this.p, new tuple(int1, int2, int3, int4)));
});

Given('v ← vector: {int},{int},{int}', function (int1, int2, int3) {
	// Write code here that turns the phrase above into concrete actions
	this.v = new vector(int1, int2, int3);
});

Then('v = tuple: {int}, {int}, {int}, {int}', function (int1, int2, int3, int4) {
	// Write code here that turns the phrase above into concrete actions
	assert(isTupleEqual(this.v, new tuple(int1, int2, int3, int4)));
});

//Floating point testing
Given('two values to compare {float}, {float}', function (float, float2) {
	// Write code here that turns the phrase above into concrete actions
	this.float = float;
	this.float2 = float2;
});

Then('first = second', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(isEqualF(this.float, this.float2));
});

Then('first != second', function () {
	// Write code here that turns the phrase above into concrete actions
	assert(!isEqualF(this.float, this.float2));
});

const POINT_TYPE = 1.0;
const VECTOR_TYPE = 0;
const EPSILON = 0.00001;

function tuple(xVal, yVal, zVal, wVal) {
	this.x = xVal;
	this.y = yVal;
	this.z = zVal;
	this.w = wVal;
}

function point(xVal, yVal, zVal) {
	return new tuple(xVal, yVal, zVal, POINT_TYPE);
}

function vector(xVal, yVal, zVal) {
	return new tuple(xVal, yVal, zVal, VECTOR_TYPE);
}

function isVector(tpl) {
	if (tpl.w === VECTOR_TYPE)
		return true;
	else
		return false;
}

function isTupleEqual(tuple1, tuple2) {
	if (isEqualF(tuple1.x, tuple2.x)
		&& isEqualF(tuple1.x, tuple2.x)
		&& isEqualF(tuple1.x, tuple2.x)
		&& isEqualF(tuple1.x, tuple2.x)) {
		return true;
	}
	else {
		return false;

	}
}

function isPoint(tpl) {
	if (tpl.w === POINT_TYPE)
		return true;
	else
		return false;
}


function isEqualF(first, second) {
	if (Math.abs(first - second) < EPSILON) {
		return true;
	}
	else {
		return false;
	}
}

