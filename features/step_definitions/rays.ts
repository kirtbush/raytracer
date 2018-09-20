import * as common from "../common";
import * as tuple from "./tuple";
import * as matrices from "./matrices";
import * as transforms from "./transforms";

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

    static position(r: Ray, t: number ){
        let distance = tuple.multiplyScalar(r.direction, t);
        let p = tuple.add(r.origin, distance);
        
        return p;
    }
}

export function createRay(orig: tuple.point, dir: tuple.vector) {
    return new Ray(orig, dir);
}


module.id = "ray";