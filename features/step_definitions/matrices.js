var common = require("../common");



class Matrix {
    constructor(f1, f2) {
        this.length = f1;

        this.arr = [];
        
        for(let idx = 0; idx < f1; idx++) {
            this.arr.push([]);
            for(let idy = 0; idy < f2; idy++) {
                this.arr[idx].push([]);
            }
        }
    }
    copyFromRawTable(other) {
        let success = true;
        let len = other.rawTable.length;


        this.arr = [];

        for(let idx = 0; idx < len; idx++) {
            this.arr[idx] = [];
            for(let idy = 0; idy < other.rawTable[idx].length; idy++) {
                this.arr[idx][idy] = other.rawTable[idx][idy];
            }
        }

        return success;
    }

    equals(other) {
        
        for(let idx = 0; idx < other.length; idx++) {
            for(let idy = 0; idy < other[idx].length; idy++) {
                if(other[idx][idy]!=this.arr[idx][idy])
                    return false;
            }
        }

        return true;
    }
}

module.exports = {
    Matrix: Matrix,
};
module.id = "matrices";