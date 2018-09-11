gorilla.DOMReady = function(cb) {
        "use strict";
        if (document.readyState === "complete") {
                return window.setTimeout(cb, 1);
        } else {
                document.addEventListener("DOMContentLoaded", function() {
                        cb();
                });
        }
};
