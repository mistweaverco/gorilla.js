gorilla.loadjs = function(urls, cb) {
        "use strict";
        let i, len;
        const appendJS = function(url, callback) {
                let s = gorilla
                        .create("script")
                        .attr("type", "text/javascript")
                        .attr("async", "true")
                        .attr("src", url);
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
                appendJS(urls[i], cb);
        }
};
