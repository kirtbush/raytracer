import * as tuple from "./tuple";
import { point_light } from "./lights";

// FYI The ! is the non-null assertion operator, telling compiler to it is non-null or 
// non undefined where the type checker cannot conclude that fact
export class Material {
    ambient: number;
    diffuse: number;
    specular: number;
    shininess: number;
    color: tuple.Color;
    constructor() {
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.specular = 0.9;
        this.shininess = 200;
        this.color = new tuple.Color(1, 1, 1);
    }

    equals(other: Material) {

        let result = other.ambient == this.ambient && other.diffuse == this.diffuse &&
            other.specular == this.specular && other.shininess == this.shininess &&
            tuple.isTupleEqual(other.color, this.color);

        return result;
    }
}

export function lighting(material: Material, light: point_light,
    point: tuple.point, eyev: tuple.vector, normalv: tuple.vector): tuple.Color {
    let illumination: number = 0;
    
    let effective_color = tuple.hadamard_product(material.color, light.intensity);
    let lightv = tuple.normalize(tuple.sub(light.position, point));
    let ambient: number = tuple.multiplyScalar(effective_color, material.ambient).x;
    let diffuse = 0;
    let specular = 0;

    let light_dot_normal = tuple.dot(lightv, normalv);
    if (light_dot_normal <= 0) {
        diffuse = 0;
        specular = 0;
    }
    else {
        diffuse = material.diffuse * effective_color.y * light_dot_normal;
        let reflectv = tuple.reflect(tuple.negate(lightv), normalv);
        let reflect_dot_eye = Math.pow(tuple.dot(reflectv, eyev), material.shininess);
        if( reflect_dot_eye <= 0) {
            specular = 0;
        }
        else {
            specular = reflect_dot_eye * material.specular * light.intensity.z;
        }
    }

    illumination = ambient + diffuse + specular;
    return new tuple.Color(illumination, illumination, illumination);
}

module.id = "materials";