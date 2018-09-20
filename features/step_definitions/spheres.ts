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
        return 
    }

    static intersects(sph: Sphere, ray: Ray) {
        sph.intersects(ray);
    }
}

export function createSphere(orig: tuple.point, rad: number) {
    return new Sphere(orig, rad);
}




module.id = "spheres";