gorilla.loadCSS = function(urls, cb) {
        "use strict";
        let i, len;
        const appendCSS = function(url, callback) {
                let s = gorilla
                        .create("link")
                        .attr("rel", "stylesheet")
                        .attr("href", url);
                if (cb) {
                        s.on("error", function() {
                                callback(true, this);
                        });
                        s.on("load", function() {
                                callback(false, this);
                        });
                }
                return gorilla
                        .find("script")
                        .get(0)
                        .prepend(s);
        };
        if (typeof urls === "string") {
                urls = [urls];
        }
        for (i = 0, len = urls.length; i < len; i++) {
                appendCSS(urls[i], cb);
        }
};
