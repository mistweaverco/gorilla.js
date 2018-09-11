gorilla.attr = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (value) {
                el.setAttribute(key, value);
        } else {
                returnvalue = el.getAttribute(key);
        }
        return returnvalue;
};
