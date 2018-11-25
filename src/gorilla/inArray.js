gorilla.inArray = function(arr, needle) {
        "use strict";
        let retval = false;
        if (arr.length) {
                let i = 0;
                let len = arr.length;
                for (; i < len; i++) {
                        if (arr[i] === needle) {
                                retval = true;
                        }
                }
        }
        return retval;
};
