import * as common from "../common";
import * as tuple from "./tuple";
import * as matrices from "./matrices";

export function translation(x: number, y:number, z:number) {
    let M = matrices.identity(4);
    M[0][3] = x;
    M[1][3] = y;
    M[2][3] = z;
    return M;
}

export function scaling(x: number, y: number, z:number) {
    let M = matrices.identity(4);

    M[0][0] = x;
    M[1][1] = y;
    M[2][2] = z;

    return M;
}

export function rotation_x(r: number) {
    let M = matrices.identity(4);

    M[1][1] = Math.cos(r);
    M[2][1] = Math.sin(r);
    M[1][2] = -Math.sin(r);
    M[2][2] = Math.cos(r);

    return M;
}

export function rotation_y(r: number) {
    let M = matrices.identity(4);

    M[1][1] = Math.cos(r);
    M[0][2] = Math.sin(r);
    M[2][0] = -Math.sin(r);
    M[2][2] = Math.cos(r);

    return M;
}

export function rotation_z(r: number) {
    let M = matrices.identity(4);

    M[0][0] = Math.cos(r);
    M[1][0] = Math.sin(r);
    M[0][1] = -Math.sin(r);
    M[1][1] = Math.cos(r);

    return M;
}

export function shearing(x_y: number, x_z: number, y_x: number, y_z:number, z_x: number, z_y: number) {
    let M = matrices.identity(4);

    M[0][1] = x_y;
    M[0][2] = x_z;
    M[1][0] = y_x;
    M[1][2] = y_z;
    M[2][0] = z_x;
    M[2][1] = z_y;

    return M;
}

module.id = "transforms";