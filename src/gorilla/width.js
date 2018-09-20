gorilla.width = function(el, val) {
        "use strict";
        let returnvalue = el;
        if (val === undefined) {
                returnvalue = el.getBoundingClientRect().width;
        } else {
                el.style.width = val + "px";
        }
        return returnvalue;
};
