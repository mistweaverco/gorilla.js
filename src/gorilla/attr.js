gorilla.attr = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (typeof value !== "undefined") {
                if (typeof value === "object") {
                        value = JSON.stringify(value);
                }
                el.setAttribute(key, String(value));
        } else if (typeof key === "object") {
                if (key.length) {
                        let list = {};
                        gorilla.each(key, (k) => {
                                list[k] = el.getAttribute(k);
                        });
                        returnvalue = list;
                } else {
                        gorilla.each(key, (v, k) => {
                                el.setAttribute(k, String(v));
                        });
                }
        } else {
                returnvalue = el.getAttribute(key);
        }
        return returnvalue;
};
