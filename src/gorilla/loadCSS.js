gorilla.loadCSS = function(url) {
        "use strict";
        return new Promise((resolve, reject) => {
                let s = gorilla
                        .create("link")
                        .attr("rel", "stylesheet")
                        .attr("href", url);
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
