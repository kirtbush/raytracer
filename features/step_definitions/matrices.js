"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("../common");
const tuple = require("./tuple");
class Matrix extends Array {
    constructor(f1, f2) {
        super();
        this.length = f1;
        for (let row = 0; row < f1; row++) {
            this[row] = [];
            for (let col = 0; col < f2; col++) {
                this[row].push([]);
                this[row][col] = 0;
            }
        }
    }
    equals(other) {
        for (let row = 0; row < other.length; row++) {
            for (let col = 0; col < other[row].length; col++) {
                if (!common.isEqualF(other[row][col], this[row][col]))
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
    determinant() {
        let det = 0;
        if (this.length > 2) {
            for (let y = 0; y < this.length; y++) {
                let currentDet = (cofactor(this, 0, y) * this[0][y]);
                det += currentDet;
            }
        }
        else {
            det = (this[0][0] * this[1][1]) - (this[0][1] * this[1][0]);
        }
        return det;
        //return (this[0][0] * this[1][1]) - (this[0][1] * this[1][0]);
    }
    isInvertible() {
        return !common.isEqualF(this.determinant(), 0);
    }
    print() {
        process.stdout.write("\n");
        for (let row = 0; row < this.length; row++) {
            for (let col = 0; col < this.length; col++) {
                process.stdout.write("| " + this[row][col] + " ");
            }
            process.stdout.write("|\n");
        }
    }
}
exports.Matrix = Matrix;
function minor(matrix, row, col) {
    return submatrix(matrix, row, col).determinant();
}
exports.minor = minor;
function isEven(n) {
    return (n % 2) == 0;
}
function cofactor(matrix, row, col) {
    let mnr = minor(matrix, row, col);
    let sum = row + col;
    let n = new Number(row + col);
    return isEven(sum) ? mnr : -mnr;
}
exports.cofactor = cofactor;
function submatrix(matrix, row, col) {
    //let splicedMatrix = matrix.splice(row, 1);
    let size = matrix.length;
    let M = new Matrix(size - 1, size - 1);
    let actualX = 0;
    let actualY = 0;
    for (let x = 0; x < size; x++) {
        if (x == row) {
            continue;
        }
        for (let y = 0, actualY = 0; y < size; y++) {
            if (y == col) {
                continue;
            }
            M[actualX][actualY] = matrix[x][y];
            actualY++;
        }
        actualX++;
    }
    return M;
}
exports.submatrix = submatrix;
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
    let M = new Matrix(m1.length, m1.length);
    for (let x = 0; x < m1.length; x++) {
        for (let y = 0; y < m1.length; y++) {
            M[x][y] = m1[y][x];
        }
    }
    return M;
}
exports.transpose = transpose;
function copyFromArrays(rt) {
    let len = rt.length;
    let M = new Matrix(rt.length, rt.length);
    for (let row = 0; row < len; row++) {
        M[row] = [];
        for (let col = 0; col < rt.length; col++) {
            M[row][col] = rt[row][col];
        }
    }
    return M;
}
exports.copyFromArrays = copyFromArrays;
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
function invert(matrix) {
    if (!matrix.isInvertible) {
        throw "invert: Matrix is not invertible! :O";
    }
    let len = matrix.length;
    let cofactorMatrix = new Matrix(len, len);
    let det = matrix.determinant();
    //create matrix of cofactors of original matrix
    for (let row = 0; row < len; row++) {
        for (let col = 0; col < len; col++) {
            cofactorMatrix[row][col] = cofactor(matrix, row, col);
        }
    }
    // transpose cofactor matrix
    let inverted = transpose(cofactorMatrix);
    //divide each of the resulting elements by the original matrix's determinant
    for (let row = 0; row < len; row++) {
        for (let col = 0; col < len; col++) {
            inverted[row][col] = inverted[row][col] / det;
        }
    }
    return inverted;
}
exports.invert = invert;
module.id = "matrices";
//# sourceMappingURL=matrices.js.map