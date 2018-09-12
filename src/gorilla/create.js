gorilla.create = function(name, options) {
        "use strict";
        let el;
        if (options) {
                el = document.createElement(name, options);
        } else {
                el = document.createElement(name);
        }
        return gorilla.find(el).get(0);
};
