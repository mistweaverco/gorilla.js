gorilla.height = function(el, val) {
        "use strict";
        let returnvalue = el;
        if (val === undefined) {
                returnvalue = el.getBoundingClientRect().height;
        } else {
                el.style.height = val + "px";
        }
        return returnvalue;
};
