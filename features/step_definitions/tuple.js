"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("../common");
// export module tuple {
class tuple {
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
exports.tuple = tuple;
class point extends tuple {
    constructor(xVal, yVal, zVal) {
        super(xVal, yVal, zVal, POINT_TYPE);
        return new tuple(xVal, yVal, zVal, POINT_TYPE);
    }
}
exports.point = point;
class vector extends tuple {
    constructor(xVal, yVal, zVal) {
        super(xVal, yVal, zVal, VECTOR_TYPE);
        return new tuple(xVal, yVal, zVal, VECTOR_TYPE);
    }
}
exports.vector = vector;
exports.VERSION = 1.0;
const POINT_TYPE = 1.0;
const VECTOR_TYPE = 0;
const ZeroVector = new vector(0, 0, 0);
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
exports.Color = Color;
function add(tuple1, tuple2) {
    return new tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, tuple1.w + tuple2.w);
}
exports.add = add;
function sub(tuple1, tuple2) {
    let newTuple = new tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, tuple1.w - tuple2.w);
    return newTuple;
}
exports.sub = sub;
function negate(tuple1) {
    return this.sub(ZeroVector, tuple1);
}
exports.negate = negate;
function multiplyScalar(tuple1, float1) {
    let newTuple = new tuple(tuple1.x * float1, tuple1.y * float1, tuple1.z * float1, tuple1.w * float1);
    return newTuple;
}
exports.multiplyScalar = multiplyScalar;
function divideScalar(tuple1, float1) {
    let newTuple = new tuple(tuple1.x / float1, tuple1.y / float1, tuple1.z / float1, tuple1.w / float1);
    return newTuple;
}
exports.divideScalar = divideScalar;
function magnitude(vector1) {
    return Math.sqrt(Math.pow(vector1.x, 2)
        + Math.pow(vector1.y, 2)
        + Math.pow(vector1.z, 2)
        + Math.pow(vector1.w, 2));
}
exports.magnitude = magnitude;
function normalize(v) {
    let mag = this.magnitude(v);
    return new tuple(v.x / mag, v.y / mag, v.z / mag, v.w / mag);
}
exports.normalize = normalize;
function dot(a, b) {
    return (a.x * b.x) +
        (a.y * b.y) +
        (a.z * b.z) +
        (a.w * b.w);
}
exports.dot = dot;
function cross(a, b) {
    return new vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}
exports.cross = cross;
//color blending by multiplying
function hadamard_product(c1, c2) {
    let r = c1.red * c2.red;
    let g = c1.green * c2.green;
    let b = c1.blue * c2.blue;
    return new Color(r, g, b);
}
exports.hadamard_product = hadamard_product;
function sqrtString(strVal) {
    return Math.sqrt(parseFloat(strVal));
}
exports.sqrtString = sqrtString;
function isVector(tpl) {
    if (tpl.w === VECTOR_TYPE)
        return true;
    else
        return false;
}
exports.isVector = isVector;
function isTupleEqual(tuple1, tuple2) {
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
exports.isTupleEqual = isTupleEqual;
function isPoint(tpl) {
    if (tpl.w === POINT_TYPE)
        return true;
    else
        return false;
}
exports.isPoint = isPoint;
//}
module.id = "tuple";
//# sourceMappingURL=tuple.js.map