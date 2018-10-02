import * as tuple from "./tuple";
import * as matrices from "./matrices";

export class Ray {
    origin: tuple.point;
    direction: tuple.vector;
    constructor(orig: tuple.point, dir: tuple.vector){
        this.origin = orig;
        this.direction = dir;
    }

    position(t: number ){
        let distance = tuple.multiplyScalar(this.direction, t);
        let p = tuple.add(this.origin, distance);
        
        return p;
    }

    static position(r: Ray, t: number ): tuple.tuple {
        let distance = tuple.multiplyScalar(r.direction, t);
        let p = tuple.add(r.origin, distance);
        
        return p;
    }


}

export function transform(ray: Ray, matrix: matrices.Matrix) : Ray {
    let newOrigin = matrix.multiplyByTuple(ray.origin);
    let newDirection = matrix.multiplyByTuple(ray.direction);
    return new Ray(newOrigin, newDirection);
}

export function createRay(orig: tuple.point, dir: tuple.vector) {
    return new Ray(orig, dir);
}


module.id = "ray";