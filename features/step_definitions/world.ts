import { point_light } from "./lights";
import { point, ORIGIN, COLOR_WHITE, Color } from "./tuple";
import { Sphere } from "./spheres";
import { scaling } from "./transforms";

export class World {
    objects: Sphere[];
    light?: point_light;
    constructor() {
        this.objects = [];
    }
}

export function default_world(): World {
    let world = new World();
    world.light = new point_light(new point(-10, 10, -10), COLOR_WHITE);
    let s1 = new Sphere(ORIGIN, 1);
    s1.material.color = new Color(0.8, 1.0, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;
     
    let s2 = new Sphere(ORIGIN, 1);
    s2.transformMatrix = scaling(0.5, 0.5, 0.5);

    world.objects[0] = s1;
    world.objects[1] = s2;

    return world;
}

module.id = "world";