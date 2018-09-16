"use strict";
//export module common {
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPSILON = 0.00001;
function isEqualF(first, second) {
    if (Math.abs(first - second) < exports.EPSILON) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEqualF = isEqualF;
function modulo(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
}
exports.modulo = modulo;
//}
//module.id="common";
