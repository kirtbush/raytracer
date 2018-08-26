
var common = require("../common");

const POINT_TYPE = 1.0;
const VECTOR_TYPE = 0;

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

	add: function(obj1, obj2) {
		return new tuple(obj1.x + obj2.x, obj1.y + obj2.y, obj1.z + obj2.z, obj1.w + obj2.w);
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