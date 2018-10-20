
export const EPSILON = 0.00001;

export function isEqualF(first: number, second: number) {
    if (Math.abs(first - second) < EPSILON) {
        return true;
    }
    else {
        return false;
    }
}

export function modulo(n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
}

module.id="common";