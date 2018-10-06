import * as tuple from "./tuple";

export class point_light {
    intensity: tuple.Color;
    position: tuple.point;
    constructor(p: tuple.point, i: tuple.Color) {
        this.intensity = i;
        this.position = p;
    }
}


module.id = "lights";