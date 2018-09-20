"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple = require("./tuple");
class Ray {
    constructor(orig, dir) {
        this.origin = orig;
        this.direction = dir;
    }
    position(t) {
        let distance = tuple.multiplyScalar(this.direction, t);
        let p = tuple.add(this.origin, distance);
        return p;
    }
    static position(r, t) {
        let distance = tuple.multiplyScalar(r.direction, t);
        let p = tuple.add(r.origin, distance);
        return p;
    }
}
exports.Ray = Ray;
function createRay(orig, dir) {
    return new Ray(orig, dir);
}
exports.createRay = createRay;
module.id = "ray";
//# sourceMappingURL=rays.js.map