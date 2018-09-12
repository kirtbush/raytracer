"use strict";
exports.__esModule = true;
var common = require("../common");
// export module tuple {
var tuple = /** @class */ (function () {
    function tuple(xVal, yVal, zVal, wVal) {
        this.x = xVal;
        this.y = yVal;
        this.z = zVal;
        this.w = wVal;
    }
    return tuple;
}());
exports.tuple = tuple;
var point = /** @class */ (function () {
    function point(xVal, yVal, zVal) {
        return new tuple(xVal, yVal, zVal, POINT_TYPE);
    }
    return point;
}());
exports.point = point;
var vector = /** @class */ (function () {
    function vector(xVal, yVal, zVal) {
        return new tuple(xVal, yVal, zVal, VECTOR_TYPE);
    }
    return vector;
}());
exports.vector = vector;
exports.VERSION = 1.0;
var POINT_TYPE = 1.0;
var VECTOR_TYPE = 0;
var ZeroVector = new vector(0, 0, 0);
var Color = /** @class */ (function () {
    function Color(r, g, b) {
        this.x = parseFloat(r);
        this.y = parseFloat(g);
        this.z = parseFloat(b);
        this.w = 0;
        //console.log("color constructed with r:"+r+" g:"+g);
    }
    Object.defineProperty(Color.prototype, "red", {
        get: function () {
            //console.log("red getter:"+this.x);
            return this.x;
        },
        set: function (value) {
            this.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "green", {
        get: function () {
            return this.y;
        },
        set: function (value) {
            this.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "blue", {
        get: function () {
            return this.z;
        },
        set: function (value) {
            this.z = value;
        },
        enumerable: true,
        configurable: true
    });
    return Color;
}());
exports.Color = Color;
function add(tuple1, tuple2) {
    return new tuple(tuple1.x + tuple2.x, tuple1.y + tuple2.y, tuple1.z + tuple2.z, tuple1.w + tuple2.w);
}
exports.add = add;
function sub(tuple1, tuple2) {
    var newTuple = new tuple(tuple1.x - tuple2.x, tuple1.y - tuple2.y, tuple1.z - tuple2.z, tuple1.w - tuple2.w);
    return newTuple;
}
exports.sub = sub;
function negate(tuple1) {
    return this.sub(ZeroVector, tuple1);
}
exports.negate = negate;
function multiplyScalar(tuple1, float1) {
    var newTuple = new tuple(tuple1.x * float1, tuple1.y * float1, tuple1.z * float1, tuple1.w * float1);
    return newTuple;
}
exports.multiplyScalar = multiplyScalar;
function divideScalar(tuple1, float1) {
    var newTuple = new tuple(tuple1.x / float1, tuple1.y / float1, tuple1.z / float1, tuple1.w / float1);
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
    var mag = this.magnitude(v);
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
    var r = c1.red * c2.red;
    var g = c1.green * c2.green;
    var b = c1.blue * c2.blue;
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
