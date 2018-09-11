gorilla.adBlockEnabled = function(cb) {
        "use strict";
        const js = document.createElement("script");
        js.src = "https://js.revsci.net/gateway/gw.js";
        js.onerror = function() {
                // adBlock is enabled
                cb(true);
                // clean up
                this.parentNode.removeChild(this);
        };
        js.onload = function() {
                // adBlock is NOT enabled
                cb(false);
                // clean up
                this.parentNode.removeChild(this);
        };
        document.body.appendChild(js);
};
