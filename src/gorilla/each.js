gorilla.each = function(arr, cb) {
        "use strict";
        let i = 0;
        let len = arr.length;
        for (; i < len; i++) {
                cb(arr[i], i);
        }
        return arr;
};
