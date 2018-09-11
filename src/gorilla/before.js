gorilla.before = function(el, beforeEl) {
        "use strict";
        el.parentNode.insertBefore(beforeEl, el);
        return el;
};
