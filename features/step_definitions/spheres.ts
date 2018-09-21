import * as common from "../common";
import * as tuple from "./tuple";
import * as matrices from "./matrices";
import * as transforms from "./transforms";
import { Ray } from "./rays";

export class Sphere {
    origin: tuple.point;
    radius: number;
    color: tuple.Color;
    constructor(orig: tuple.point, radius: number) {
        this.origin = orig;
        this.radius = radius;
    }

    intersects(ray: Ray) {

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

export function createSphere(orig: tuple.point, rad: number) {
    return new Sphere(orig, rad);
}

module.id = "spheres";