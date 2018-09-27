import * as common from "../common";
import * as tuple from "./tuple";
import * as matrices from "./matrices";
import * as transforms from "./transforms";
import { Ray } from "./rays";
import { Sphere } from "./spheres";

export class Intersection {
    t: number;
    object: object;
    constructor(t: number, obj: object) {
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
    let foundIndex = -1;
    let foundT = objects[0];
    for(let x = 0; x < objects.length; x++) {
        if(objects[x].t < foundT && objects[x].t>=0) {
            foundIndex = x;
        }
    }
    
    if(foundIndex==-1) // no hits
        return null;

    return objects[foundIndex];
}

module.id = "intersections";