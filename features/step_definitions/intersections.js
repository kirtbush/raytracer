"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("../common");
class Intersection {
    constructor(t, obj) {
        this.t = t;
        this.object = obj;
    }
    equals(other) {
        return common.isEqualF(this.t, other.t) && this.object == other.object;
    }
}
exports.Intersection = Intersection;
class IntersectionArray extends Array {
    constructor(inputArray) {
        super();
        for (let x = 0; x < inputArray.length; x++) {
            this.push(inputArray[x]);
        }
    }
}
exports.IntersectionArray = IntersectionArray;
function hit(objects) {
    let foundIndex = 0;
    let foundT = objects[0];
    for (let x = 0; x < objects.length; x++) {
        if (objects[x].t < foundT && objects[x].t >= 0) {
            foundIndex = x;
        }
    }
    if (foundT == null || foundT.t < 0) // no hits
        return null;
    return objects[foundIndex];
}
exports.hit = hit;
module.id = "intersections";
//# sourceMappingURL=intersections.js.map