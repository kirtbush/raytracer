"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrices = require("./matrices");
function translation(x, y, z) {
    let M = matrices.identity(4);
    M[0][3] = x;
    M[1][3] = y;
    M[2][3] = z;
    return M;
}
exports.translation = translation;
module.id = "transforms";
//# sourceMappingURL=transforms.js.map