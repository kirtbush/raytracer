"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sphere {
    constructor(orig, radius) {
        this.origin = orig;
        this.radius = radius;
    }
    intersects(ray) {
        return;
    }
    static intersects(sph, ray) {
        sph.intersects(ray);
    }
}
exports.Sphere = Sphere;
function createSphere(orig, rad) {
    return new Sphere(orig, rad);
}
exports.createSphere = createSphere;
module.id = "spheres";
//# sourceMappingURL=spheres.js.map