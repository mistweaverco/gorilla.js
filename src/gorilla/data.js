gorilla.data = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (typeof value !== "undefined") {
                if (typeof value === "object") {
                        value = JSON.stringify(value);
                }
                el.setAttribute("data-" + key, String(value));
        } else if (typeof key === "object") {
                if (key.length) {
                        let list = {};
                        gorilla.each(key, (k) => {
                                list[k] = el.getAttribute("data-" + k);
                        });
                        returnvalue = list;
                } else {
                        gorilla.each(key, (v, k) => {
                                if (typeof v === "object") {
                                        v = JSON.stringify(v);
                                }
                                el.setAttribute("data-" + k, String(v));
                        });
                }
        } else {
                returnvalue = el.getAttribute("data-" + key);
        }
        return returnvalue;
};
