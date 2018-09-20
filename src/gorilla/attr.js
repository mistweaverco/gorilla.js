gorilla.attr = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (value) {
                el.setAttribute(key, value);
        } else if (typeof key === "object") {
                gorilla.each(key, (v, k) => {
                        el.setAttribute(k, v);
                });
        } else {
                returnvalue = el.getAttribute(key);
        }
        return returnvalue;
};
