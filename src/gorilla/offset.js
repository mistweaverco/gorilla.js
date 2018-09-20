gorilla.offset = function(el) {
        "use strict";
        const _offset = el.getBoundingClientRect();
        return {
                top: _offset.top,
                left: _offset.left
        };
};
