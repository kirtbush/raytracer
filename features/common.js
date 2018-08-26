module.id = "common";

const EPSILON = 0.00001;

module.exports = {
    
    isEqualF: function (first, second) {
        if (Math.abs(first - second) < EPSILON) {
            return true;
        }
        else {
            return false;
        }
    }
};