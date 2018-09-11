gorilla.nodes = function(el) {
        "use strict";
        let child, child_arr, i, len, ref;
        child_arr = [];
        ref = el.children;
        for (i = 0, len = ref.length; i < len; i++) {
                child = ref[i];
                child_arr.push(gorilla.find(child).get(0));
        }
        return child_arr;
};
