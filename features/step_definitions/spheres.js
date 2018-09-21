"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple = require("./tuple");
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
            return [];
        }
        let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        if (t1 > t2)
            return [t2, t1];
        return [t1, t2];
    }
}
exports.Sphere = Sphere;
function createSphere(orig, rad) {
    return new Sphere(orig, rad);
}
exports.createSphere = createSphere;
module.id = "spheres";
//# sourceMappingURL=spheres.js.map