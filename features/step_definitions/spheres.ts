import * as common from "../common";
import * as tuple from "./tuple";
import * as matrices from "./matrices";
import { Ray, transform } from "./rays";
import { Intersection, IntersectionArray } from "./intersections";
import { Material } from "./materials";

export class Sphere {
    origin: tuple.point;
    radius: number;
    transformMatrix: matrices.Matrix;
    material: Material;
    constructor(orig: tuple.point, radius: number) {
        this.origin = orig;
        this.radius = radius;
        this.transformMatrix = matrices.identity(4);
        this.material = new Material();
    }

    intersects(rayOrig: Ray): IntersectionArray {
        let ray = transform(rayOrig, matrices.invert(this.transformMatrix));
        let sphere_to_ray = tuple.sub(ray.origin, new tuple.point(0, 0, 0));
        let a = tuple.dot(ray.direction, ray.direction);
        let b = 2 * tuple.dot(ray.direction, sphere_to_ray);
        let c = tuple.dot(sphere_to_ray, sphere_to_ray) - 1;
        let discriminant = (b * b) - (4 * a * c);

        if (discriminant < 0) {
            return new IntersectionArray([]);
        }

        let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        if (t1 > t2)
            return new IntersectionArray([new Intersection(t2, this), new Intersection(t1, this)]);

        return new IntersectionArray([new Intersection(t1, this), new Intersection(t2, this)]);
    }

    equals(other) {
        if(other==null)
            return false;
            
        return common.isEqualF(this.radius, other.radius) && tuple.isTupleEqual(this.origin, other.origin);
    }

    normal_at(world_point: tuple.point): tuple.point {
        let object_point = matrices.invert(this.transformMatrix).multiplyByTuple(world_point);
        let object_normal = tuple.sub(object_point, new tuple.point(0,0,0));
        let world_normal = matrices.transpose(matrices.invert(this.transformMatrix)).multiplyByTuple(object_normal);
        world_normal.w = 0; //reset due to being skewed by transpose
        return tuple.normalize(world_normal); 
    }

}

export function set_transform(s:Sphere, t:matrices.Matrix) {
    s.transformMatrix = t;
}

export function createSphere(orig: tuple.point, rad: number) {
    return new Sphere(orig, rad);
}

module.id = "spheres";