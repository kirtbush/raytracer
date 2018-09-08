
var common = require("../common");

const VERSION = 1.0;
const POINT_TYPE = 1.0;
const VECTOR_TYPE = 0;
const ZeroVector = new vector(0, 0, 0);

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

class Canvas {
	constructor(w, h) {
		this.width = w;
		this.height = h;
	}
}

class Color {
	constructor(r, g, b) {
		this.x = parseFloat(r);
		this.y = parseFloat(g);
		this.z = parseFloat(b);
		this.w = 0;
		//console.log("color constructed with r:"+r+" g:"+g);
	}
	get red() {
		//console.log("red getter:"+this.x);
		return this.x;
	}
	set red(value) {
		this.x = value;
	}
	get green() {
		return this.y;
	}
	set green(value) {
		this.y = value;
	}
	get blue() {
		return this.z;
	}
	set blue(value) {
		this.z = value;
	}
}

module.exports = {
	tuple: tuple,
	point: point,
	vector: vector,
	Color: Color,
	Canvas: Canvas,

	//This function exists solely because cucumber cannot find 
	// the tuple constructor found above...
	// createTuple: function (xVal, yVal, zVal, wVal) {
	// 	return new tuple(xVal, yVal, zVal, wVal);
	// },

	// createColor: function (rVal, gVal, bVal) {
	// 	return new Color(parseFloat(rVal), parseFloat(gVal), parseFloat(bVal));
	// },

	add: function (tuple1, tuple2) {
		return new tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, tuple1.w + tuple2.w);
	},

	sub: function (tuple1, tuple2) {
		let newTuple = new tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, tuple1.w - tuple2.w);
		return newTuple;
	},

	negate: function (tuple1) {
		return this.sub(ZeroVector, tuple1);
	},

	multiplyScalar: function (tuple1, float1) {
		let newTuple = new tuple(tuple1.x * float1, tuple1.y * float1, tuple1.z * float1, tuple1.w * float1);
		return newTuple;
	},

	divideScalar: function (tuple1, float1) {
		let newTuple = new tuple(tuple1.x / float1, tuple1.y / float1, tuple1.z / float1, tuple1.w / float1);
		return newTuple;
	},

	magnitude: function (vector1) {
		return Math.sqrt(Math.pow(vector1.x, 2)
			+ Math.pow(vector1.y, 2)
			+ Math.pow(vector1.z, 2)
			+ Math.pow(vector1.w, 2));
	},

	normalize: function (v) {
		let mag = this.magnitude(v);
		return new tuple(v.x / mag, v.y / mag, v.z / mag, v.w / mag);
	},

	dot: function (a, b) {
		return (a.x * b.x) +
			(a.y * b.y) +
			(a.z * b.z) +
			(a.w * b.w);
	},
	cross: function (a, b) {
		return vector(a.y * b.z - a.z * b.y,
			a.z * b.x - a.x * b.z,
			a.x * b.y - a.y * b.x)
	},

	//color blending by multiplying
	hadamard_product: function (c1, c2) {
		r = c1.red * c2.red;
		g = c1.green * c2.green;
		b = c1.blue * c2.blue;
		return new Color(r, g, b);
	},

	sqrtString: function (strVal) {
		return Math.sqrt(parseFloat(strVal));
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