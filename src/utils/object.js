if (!Object.equals) {
    Object.equals = function (a, b) {
        if (!Object.isObject(a) || !Object.isObject(b)) {
            throw new Error('Object.empty: Object is not an object');
        }

        if (a === b) {
            return true;
        }

        const propsA = Object.keys(a);
        const propsB = Object.keys(b);

        if (propsA.length !== propsB.length) {
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

        for (let i = 0; i < propsA.length; i++) {
            const propName = propsA[i];
            if (!compare(a[propName], b[propName])) {
                return false;
            }
        }

        return true;
    };
}

if (!Object.isObject) {
    Object.isObject = function (a) {
        return Object.prototype.toString.call(a) === '[object Object]';
    }
}

if (!Object.empty) {
    Object.empty = function (a) {
        if (!Object.isObject(a)) {
            throw new Error('Object.empty: Object is not an object');
        }

        if (Object.keys(a).length === 0) {
            return true;
        }

        return Object.values(a).some(x => (x === null || x === ''));
    };
}