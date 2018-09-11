gorilla.on = function(el, eventName, cb) {
        "use strict";
        el.addEventListener(eventName, cb, false);
        return el;
};
