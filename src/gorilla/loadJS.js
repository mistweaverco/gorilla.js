gorilla.loadJS = function(url) {
        "use strict";
        return new Promise((resolve, reject) => {
                let s = gorilla
                        .create("script")
                        .attr("type", "text/javascript")
                        .attr("async", "true")
                        .attr("src", url);
                s.on("error", function(err) {
                        reject(err);
                });
                s.on("load", function() {
                        resolve(this);
                });
                return gorilla
                        .find("script")
                        .get(0)
                        .prepend(s);
        });
};
