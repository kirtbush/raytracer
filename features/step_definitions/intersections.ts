import * as common from "../common";
import * as tuple from "./tuple";
import * as matrices from "./matrices";
import * as transforms from "./transforms";
import { Ray } from "./rays";

export class Intersection {
    t: number;
    object: object;
    constructor(t: number, obj: object) {
        this.t = t;
        this.object = obj;
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

module.id = "intersections";