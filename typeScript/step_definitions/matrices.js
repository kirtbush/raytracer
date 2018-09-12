"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple = require("./tuple");
class Matrix extends Array {
    constructor(f1, f2) {
        super();
        this.length = f1;
        for (let row = 0; row < f1; row++) {
            this[row] = [];
            for (let col = 0; col < f2; col++) {
                this[row].push([]);
            }
        }
    }
    equals(other) {
        for (let row = 0; row < other.length; row++) {
            for (let col = 0; col < other[row].length; col++) {
                if (other[row][col] != this[row][col])
                    return false;
            }
        }
        return true;
    }
    multiply(other) {
        let M = new Matrix(this.length, this.length);
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                M[row][col] = 0;
                for (let idz = 0; idz < this.length; idz++) {
                    M[row][col] += (this[row][idz] * other[idz][col]);
                }
            }
        }
        return M;
    }
    multiplyByTuple(tupleIn) {
        let inputArray = [tupleIn.x, tupleIn.y, tupleIn.z, tupleIn.w];
        let outputArray = [0, 0, 0, 0];
        let T = new tuple.tuple(0, 0, 0, 0);
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                outputArray[row] += (this[row][col] * inputArray[col]);
            }
        }
        T.x = outputArray[0];
        T.y = outputArray[1];
        T.z = outputArray[2];
        T.w = outputArray[3];
        return T;
    }
}
exports.Matrix = Matrix;
function identity(size) {
    let M = new Matrix(size, size);
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (x == y)
                M[x][y] = 1;
            else
                M[x][y] = 0;
        }
    }
    return M;
}
exports.identity = identity;
function transpose(m1) {
}
exports.transpose = transpose;
function copyFromRawTable(rt) {
    let len = rt.rawTable.length;
    let M = new Matrix(rt.rawTable.length, rt.rawTable.length);
    for (let row = 0; row < len; row++) {
        M[row] = [];
        for (let col = 0; col < rt.rawTable[row].length; col++) {
            M[row][col] = parseFloat(rt.rawTable[row][col]);
        }
    }
    return M;
}
exports.copyFromRawTable = copyFromRawTable;
module.id = "matrices";
