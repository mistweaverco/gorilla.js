gorilla.each = function(arr, cb) {
        "use strict";
        if (arr.length) {
                let i = 0;
                let len = arr.length;
                for (; i < len; i++) {
                        cb(arr[i], i);
                }
        } else {
                for (let k in arr) {
                        if (Reflect.has(arr, k)) {
                                cb(arr[k], k);
                        }
                }
        }
        return arr;
};
