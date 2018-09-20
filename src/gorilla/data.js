gorilla.data = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (value) {
                if (typeof value === "object") {
                        value = JSON.stringify(value);
                }
                el.setAttribute("data-" + key, value);
        } else if (typeof key === "object" && !key.length) {
                gorilla.each(key, (v, k) => {
                        if (typeof v === "object") {
                                v = JSON.stringify(v);
                        }
                        el.setAttribute("data-" + k, v);
                });
        } else {
                returnvalue = el.getAttribute("data-" + key);
        }
        return returnvalue;
};
