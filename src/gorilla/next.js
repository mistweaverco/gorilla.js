gorilla.next = function(el) {
        "use strict";
        return gorilla.find(el.nextElementSibling).get(0);
};
