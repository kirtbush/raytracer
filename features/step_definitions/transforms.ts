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

module.id = "transforms";