gorilla.prepend = function(el, prependEl) {
        "use strict";
        el.parentNode.insertBefore(prependEl, el);
        return el;
};
