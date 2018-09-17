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
function scaling(x, y, z) {
    let M = matrices.identity(4);
    M[0][0] = x;
    M[1][1] = y;
    M[2][2] = z;
    return M;
}
exports.scaling = scaling;
function rotation_x(r) {
    let M = matrices.identity(4);
    M[1][1] = Math.cos(r);
    M[2][1] = Math.sin(r);
    M[1][2] = -Math.sin(r);
    M[2][2] = Math.cos(r);
    return M;
}
exports.rotation_x = rotation_x;
function rotation_y(r) {
    let M = matrices.identity(4);
    M[1][1] = Math.cos(r);
    M[0][2] = Math.sin(r);
    M[2][0] = -Math.sin(r);
    M[2][2] = Math.cos(r);
    return M;
}
exports.rotation_y = rotation_y;
function rotation_z(r) {
    let M = matrices.identity(4);
    M[0][0] = Math.cos(r);
    M[1][0] = Math.sin(r);
    M[0][1] = -Math.sin(r);
    M[1][1] = Math.cos(r);
    return M;
}
exports.rotation_z = rotation_z;
function shearing(x_y, x_z, y_x, y_z, z_x, z_y) {
    let M = matrices.identity(4);
    M[0][1] = x_y;
    M[0][2] = x_z;
    M[1][0] = y_x;
    M[1][2] = y_z;
    M[2][0] = z_x;
    M[2][1] = z_y;
    return M;
}
exports.shearing = shearing;
module.id = "transforms";
//# sourceMappingURL=transforms.js.map