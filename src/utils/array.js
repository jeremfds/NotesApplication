if (!Array.equals) {
    Array.equals = function (a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            throw new Error('Array.empty: Array is not an array');
        }

        if (a === b) {
            return true;
        }

        if (a.length !== b.length) {
            return false;
        }

        const compare = function (x, y) {
            const typeX = Object.prototype.toString.call(x);
            const typeY = Object.prototype.toString.call(y);

            if (typeX !== typeY) {
                return false;
            }

            if (typeX === '[object Array]') {
                if (x.length !== y.length) {
                    return false;
                }

                for (let i = 0; i < x.length; i++) {
                    if (!compare(x[i], y[i])) {
                        return false;
                    }
                }

                return true;
            } else if (typeX === '[object Object]') {
                const propsX = Object.keys(x);
                const propsY = Object.keys(y);

                if (propsX.length !== propsY.length) {
                    return false;
                }

                for (let i = 0; i < propsX.length; i++) {
                    const propName = propsX[i];
                    if (!compare(x[propName], y[propName])) {
                        return false;
                    }
                }

                return true;
            } else if (typeX === '[object Number]' ||
                typeX === '[object String]' ||
                typeX === '[object Boolean]' ||
                typeX === '[object Null]') {
                return x === y;
            } else if (typeX === '[object Function]') {
                return x.toString() === y.toString();
            }
            return false;

        };

        for (let i = 0; i < a.length; i++) {
            if (!compare(a[i], b[i])) {
                return false;
            }
        }

        return true;
    };
}

if (!Array.empty) {
    Array.empty = function (a) {
        if (!Array.isArray(a)) {
            throw new Error('Array.empty: Array is not an array');
        }

        return a.length === 0;
    };
}