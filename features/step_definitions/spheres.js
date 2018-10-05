"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("../common");
const tuple = require("./tuple");
const matrices = require("./matrices");
const rays_1 = require("./rays");
const intersections_1 = require("./intersections");
const materials_1 = require("./materials");
class Sphere {
    constructor(orig, radius) {
        this.origin = orig;
        this.radius = radius;
        this.transformMatrix = matrices.identity(4);
        this.material = new materials_1.Material();
    }
    intersects(rayOrig) {
        let ray = rays_1.transform(rayOrig, matrices.invert(this.transformMatrix));
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
        if (other == null)
            return false;
        return common.isEqualF(this.radius, other.radius) && tuple.isTupleEqual(this.origin, other.origin);
    }
    normal_at(world_point) {
        let object_point = matrices.invert(this.transformMatrix).multiplyByTuple(world_point);
        let object_normal = tuple.sub(object_point, new tuple.point(0, 0, 0));
        let world_normal = matrices.transpose(matrices.invert(this.transformMatrix)).multiplyByTuple(object_normal);
        world_normal.w = 0; //reset due to being skewed by transpose
        return tuple.normalize(world_normal);
    }
}
exports.Sphere = Sphere;
function set_transform(s, t) {
    s.transformMatrix = t;
}
exports.set_transform = set_transform;
function createSphere(orig, rad) {
    return new Sphere(orig, rad);
}
exports.createSphere = createSphere;
module.id = "spheres";
//# sourceMappingURL=spheres.js.map