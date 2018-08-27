
var common = require("../common");

const POINT_TYPE = 1.0;
const VECTOR_TYPE = 0;
const ZeroVector = new tuple(0,0,0,0);

function tuple (xVal, yVal, zVal, wVal) {
	this.x = xVal;
	this.y = yVal;
	this.z = zVal;
	this.w = wVal;
}

function point (xVal, yVal, zVal) {
	return new tuple(xVal, yVal, zVal, POINT_TYPE);
}

function vector(xVal, yVal, zVal) {
	return new tuple(xVal, yVal, zVal, VECTOR_TYPE);
}

module.exports = {
	tuple: tuple,
	point: point,
	vector: vector,

	//This function exists solely because cucumber cannot find 
	// the tuple constrctor found above...
	createTuple: function(xVal, yVal, zVal, wVal) {
		return new tuple(xVal, yVal, zVal, wVal);
	},

	add: function(tuple1, tuple2) {
		return new tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, tuple1.w + tuple2.w);
	},

	sub: function(tuple1, tuple2) {
		let newTuple = new tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, tuple1.w - tuple2.w);
		return newTuple;
	},

	negate: function(tuple1) {
		return this.sub(new vector(0,0,0), tuple1);
	},

	isVector: function (tpl) {
		if (tpl.w === VECTOR_TYPE)
			return true;
		else
			return false;
	},

	isTupleEqual: function (tuple1, tuple2) {
		if (common.isEqualF(tuple1.x, tuple2.x)
			&& common.isEqualF(tuple1.x, tuple2.x)
			&& common.isEqualF(tuple1.x, tuple2.x)
			&& common.isEqualF(tuple1.x, tuple2.x)) {
			return true;
		}
		else {
			return false;

		}
	},

	isPoint: function (tpl) {
		if (tpl.w === POINT_TYPE)
			return true;
		else
			return false;
	}
};
module.id = "tuple";