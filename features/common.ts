
//export module common {

    export const EPSILON = 0.00001;

    export function isEqualF(first, second) {
        if (Math.abs(first - second) < EPSILON) {
            return true;
        }
        else {
            return false;
        }
    }
//}

//module.id="common";