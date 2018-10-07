"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple = require("./tuple");
// FYI The ! is the non-null assertion operator, telling compiler to it is non-null or 
// non undefined where the type checker cannot conclude that fact
class Material {
    constructor() {
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.specular = 0.9;
        this.shininess = 200;
        this.color = new tuple.Color(1, 1, 1);
    }
    equals(other) {
        let result = other.ambient == this.ambient && other.diffuse == this.diffuse &&
            other.specular == this.specular && other.shininess == this.shininess &&
            tuple.isTupleEqual(other.color, this.color);
        return result;
    }
}
exports.Material = Material;
function lighting(material, light, point, eyev, normalv) {
    let illumination = 0;
    let effective_color = tuple.hadamard_product(material.color, light.intensity);
    let lightv = tuple.normalize(tuple.sub(light.position, point));
    let ambient = tuple.multiplyScalar(effective_color, material.ambient).x;
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
        if (reflect_dot_eye <= 0) {
            specular = 0;
        }
        else {
            specular = reflect_dot_eye * material.specular * light.intensity.z;
        }
    }
    illumination = ambient + diffuse + specular;
    return new tuple.Color(illumination, illumination, illumination);
}
exports.lighting = lighting;
module.id = "materials";
//# sourceMappingURL=materials.js.map