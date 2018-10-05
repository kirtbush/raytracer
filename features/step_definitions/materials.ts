import { Color, isTupleEqual } from "./tuple";

// FYI The ! is the non-null assertion operator, telling compiler to it is non-null or 
// non undefined where the type checker cannot conclude that fact
export class Material {
    ambient: number;
    diffuse: number;
    specular: number;
    shininess: number;
    color: Color;
    constructor() {
        this.ambient = 0;
        this.diffuse = 0;
        this.specular = 0;
        this.shininess = 0;
        this.color = new Color(0, 0, 0);
    }

    equals(other: Material) {
        
        let result = other.ambient == this.ambient && other.diffuse == this.diffuse &&
            other.specular == this.specular && other.shininess == this.shininess &&
            isTupleEqual(other.color, this.color);

        return result;            
    }
}

module.id = "materials";