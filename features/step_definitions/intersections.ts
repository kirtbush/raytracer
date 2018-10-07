import * as common from "../common";
import { Sphere } from "./spheres";

export class Intersection {
    t: number;
    object: Sphere;
    constructor(t: number, obj: Sphere) {
        this.t = t;
        this.object = obj;
    }

    equals(other: Intersection) {
        return common.isEqualF(this.t, other.t) && this.object==other.object;
    }
}

export class IntersectionArray extends Array {
    constructor(inputArray: Array<Intersection>){
        super();
        for(let x = 0; x < inputArray.length; x++) {
            this.push(inputArray[x]);
        }
    }
}

export function hit(objects: IntersectionArray) {
    let foundIndex = 0;
    let foundT = objects[0];
    for(let x = 0; x < objects.length; x++) {
        if(objects[x].t < foundT && objects[x].t>=0) {
            foundIndex = x;
        }
    }
    
    if(foundT == null || foundT.t < 0) // no hits
        return null;


    return objects[foundIndex];
}

module.id = "intersections";