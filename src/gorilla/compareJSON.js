gorilla.compareJSON = function(json1, json2) {
        "use strict";
        const _helper = function(a, b, prop) {
                if (typeof a[prop] === "object") {
                        if (!aIsInB(a[prop], b[prop])) {
                                return false;
                        }
                } else if (a[prop] !== b[prop]) {
                        return false;
                }
        };
        const aIsInB = function(a, b) {
                for (let prop in a) {
                        if (Reflect.has(prop, a)) {
                                if (Reflect.has(prop, b)) {
                                        return _helper(a, b, prop);
                                } else {
                                        return false;
                                }
                        }
                }
                return true;
        };
        return aIsInB(json1, json2) && aIsInB(json2, json1);
};
