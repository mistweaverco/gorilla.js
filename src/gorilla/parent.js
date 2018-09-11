gorilla.parent = function(el) {
        "use strict";
        return gorilla.find(el.parentNode).get(0);
};
