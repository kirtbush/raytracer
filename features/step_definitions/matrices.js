"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tuple = require("./tuple");
var Matrix = /** @class */ (function (_super) {
    __extends(Matrix, _super);
    function Matrix(f1, f2) {
        var _this = _super.call(this) || this;
        _this.length = f1;
        for (var row = 0; row < f1; row++) {
            _this[row] = [];
            for (var col = 0; col < f2; col++) {
                _this[row].push([]);
            }
        }
        return _this;
    }
    Matrix.prototype.equals = function (other) {
        for (var row = 0; row < other.length; row++) {
            for (var col = 0; col < other[row].length; col++) {
                if (other[row][col] != this[row][col])
                    return false;
            }
        }
        return true;
    };
    Matrix.prototype.multiply = function (other) {
        var M = new Matrix(this.length, this.length);
        for (var row = 0; row < this.length; row++) {
            for (var col = 0; col < this.length; col++) {
                M[row][col] = 0;
                for (var idz = 0; idz < this.length; idz++) {
                    M[row][col] += (this[row][idz] * other[idz][col]);
                }
            }
        }
        return M;
    };
    Matrix.prototype.multiplyByTuple = function (tupleIn) {
        var inputArray = [tupleIn.x, tupleIn.y, tupleIn.z, tupleIn.w];
        var outputArray = [0, 0, 0, 0];
        var T = new tuple.tuple(0, 0, 0, 0);
        for (var row = 0; row < this.length; row++) {
            for (var col = 0; col < this.length; col++) {
                outputArray[row] += (this[row][col] * inputArray[col]);
            }
        }
        T.x = outputArray[0];
        T.y = outputArray[1];
        T.z = outputArray[2];
        T.w = outputArray[3];
        return T;
    };
    return Matrix;
}(Array));
module.exports = {
    Matrix: Matrix,
    identity: function (size) {
        var M = new Matrix(size, size);
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                if (x == y)
                    M[x][y] = 1;
                else
                    M[x][y] = 0;
            }
        }
        return M;
    },
    transpose: function (m1) {
    },
    copyFromRawTable: function (rt) {
        var len = rt.rawTable.length;
        var M = new Matrix(rt.rawTable.length, rt.rawTable.length);
        for (var row = 0; row < len; row++) {
            M[row] = [];
            for (var col = 0; col < rt.rawTable[row].length; col++) {
                M[row][col] = parseFloat(rt.rawTable[row][col]);
            }
        }
        return M;
    }
};
module.id = "matrices";
