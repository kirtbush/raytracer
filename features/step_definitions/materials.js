"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple_1 = require("./tuple");
// FYI The ! is the non-null assertion operator, telling compiler to it is non-null or 
// non undefined where the type checker cannot conclude that fact
class Material {
    constructor() {
        this.ambient = 0;
        this.diffuse = 0;
        this.specular = 0;
        this.shininess = 0;
        this.color = new tuple_1.Color(0, 0, 0);
    }
    equals(other) {
        let result = other.ambient == this.ambient && other.diffuse == this.diffuse &&
            other.specular == this.specular && other.shininess == this.shininess &&
            tuple_1.isTupleEqual(other.color, this.color);
        return result;
    }
}
exports.Material = Material;
module.id = "materials";
//# sourceMappingURL=materials.js.map