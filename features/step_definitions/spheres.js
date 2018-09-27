"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("../common");
const tuple = require("./tuple");
const intersections_1 = require("./intersections");
class Sphere {
    constructor(orig, radius) {
        this.origin = orig;
        this.radius = radius;
    }
    intersects(ray) {
        let sphere_to_ray = tuple.sub(ray.origin, new tuple.point(0, 0, 0));
        let a = tuple.dot(ray.direction, ray.direction);
        let b = 2 * tuple.dot(ray.direction, sphere_to_ray);
        let c = tuple.dot(sphere_to_ray, sphere_to_ray) - 1;
        let discriminant = (b * b) - (4 * a * c);
        if (discriminant < 0) {
            return new intersections_1.IntersectionArray([]);
        }
        let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        if (t1 > t2)
            return new intersections_1.IntersectionArray([new intersections_1.Intersection(t2, this), new intersections_1.Intersection(t1, this)]);
        return new intersections_1.IntersectionArray([new intersections_1.Intersection(t1, this), new intersections_1.Intersection(t2, this)]);
    }
    equals(other) {
        return common.isEqualF(this.radius, other.radius) && tuple.isTupleEqual(this.origin, other.origin);
    }
}
exports.Sphere = Sphere;
function createSphere(orig, rad) {
    return new Sphere(orig, rad);
}
exports.createSphere = createSphere;
module.id = "spheres";
//# sourceMappingURL=spheres.js.map