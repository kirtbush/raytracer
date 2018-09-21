"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Intersection {
    constructor(t, obj) {
        this.t = t;
        this.object = obj;
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
module.id = "intersections";
//# sourceMappingURL=intersections.js.map