gorilla.html = function(el, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (typeof value === "string") {
                el.innerHTML = value;
        } else {
                return el.innerHTML;
        }
        return returnvalue;
};
