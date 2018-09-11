gorilla.prev = function(el) {
        "use strict";
        return gorilla.find(el.previousElementSibling).get(0);
};
