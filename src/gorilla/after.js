gorilla.after = function(el, afterEl) {
        "use strict";
        el.parentNode.insertBefore(afterEl, el.nextElementSibling);
        return el;
};
