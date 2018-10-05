import * as common from "../common";

// export module tuple {

export class tuple {
	x: number;
	y: number;
	z: number;
	w: number;
	constructor(xVal, yVal, zVal, wVal) {
		this.x = xVal;
		this.y = yVal;
		this.z = zVal;
		this.w = wVal;
	}
	print() {
		console.log(" " + this.x + "\n", this.y + "\n", this.z + "\n", this.w + "\n");
	}
}



export class point extends tuple {
	constructor(xVal, yVal, zVal) {
		super(xVal, yVal, zVal, POINT_TYPE);
		return new tuple(xVal, yVal, zVal, POINT_TYPE);
	}
}

export class vector extends tuple {
	constructor(xVal, yVal, zVal) {
		super(xVal, yVal, zVal, VECTOR_TYPE);
		return new tuple(xVal, yVal, zVal, VECTOR_TYPE);
	}
}

export const VERSION = 1.0;
const POINT_TYPE = 1.0;
const VECTOR_TYPE = 0;
const ZeroVector = new vector(0, 0, 0);

export class Color {
	x: number;
	y: number;
	z: number;
	w: number;
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

export function add(tuple1, tuple2): tuple {
	return new tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, tuple1.w + tuple2.w);
}

export function sub(tuple1, tuple2): tuple {
	let newTuple = new tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, tuple1.w - tuple2.w);
	return newTuple;
}

export function negate(tuple1: tuple): tuple {
	return this.sub(ZeroVector, tuple1);
}

export function multiplyScalar(tuple1: tuple, float1: number): tuple {
	let newTuple = new tuple(tuple1.x * float1, tuple1.y * float1, tuple1.z * float1, tuple1.w * float1);
	return newTuple;
}

export function divideScalar(tuple1: tuple, float1: number): tuple {
	let newTuple = new tuple(tuple1.x / float1, tuple1.y / float1, tuple1.z / float1, tuple1.w / float1);
	return newTuple;
}

export function magnitude(vector1: vector): number {
	return Math.sqrt(Math.pow(vector1.x, 2)
		+ Math.pow(vector1.y, 2)
		+ Math.pow(vector1.z, 2)
		+ Math.pow(vector1.w, 2));
}

export function normalize(v: vector): tuple {
	let mag = this.magnitude(v);
	return new tuple(v.x / mag, v.y / mag, v.z / mag, v.w / mag);
}

export function dot(a: tuple, b: tuple): number {
	return (a.x * b.x) +
		(a.y * b.y) +
		(a.z * b.z) +
		(a.w * b.w);
}
export function cross(a: tuple, b: tuple): tuple {
	return new vector(a.y * b.z - a.z * b.y,
		a.z * b.x - a.x * b.z,
		a.x * b.y - a.y * b.x)
}

//color blending by multiplying
export function hadamard_product(c1: Color, c2: Color): Color {
	let r = c1.red * c2.red;
	let g = c1.green * c2.green;
	let b = c1.blue * c2.blue;
	return new Color(r, g, b);
}

export function sqrtString(strVal) {
	return Math.sqrt(parseFloat(strVal));
}

export function isVector(tpl) {
	if (tpl.w === VECTOR_TYPE)
		return true;
	else
		return false;
}

export function isTupleEqual(tuple1, tuple2) {
	if (common.isEqualF(tuple1.x, tuple2.x)
		&& common.isEqualF(tuple1.x, tuple2.x)
		&& common.isEqualF(tuple1.x, tuple2.x)
		&& common.isEqualF(tuple1.x, tuple2.x)) {
		return true;
	}
	else {
		return false;

	}
}

export function isPoint(tpl) {
	if (tpl.w === POINT_TYPE)
		return true;
	else
		return false;
}

export function reflect(input: vector, normal: vector) {
	return sub(input, (multiplyScalar(normal, 2 * dot(input, normal))));
}


//}
module.id = "tuple";