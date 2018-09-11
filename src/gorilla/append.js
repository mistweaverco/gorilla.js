gorilla.append = function(el, appendEl) {
        "use strict";
        if (appendEl.length) {
                appendEl.forEach(function(tmp) {
                        el.appendChild(tmp);
                });
        } else {
                el.appendChild(appendEl);
        }
        return el;
};
