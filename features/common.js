"use strict";
//export module common {
exports.__esModule = true;
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
//}
//module.id="common";
