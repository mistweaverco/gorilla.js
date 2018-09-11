gorilla.adBlockEnabled = function() {
        "use strict";
        return new Promise((resolve) => {
                const js = gorilla
                        .create("script")
                        .attr("src", "https://stats.t-online.de/js/ads.js")
                        .on("error", function() {
                                // clean up
                                this.parentNode.removeChild(this);
                                // adBlock is enabled
                                resolve(true);
                        })
                        .on("load", function() {
                                // clean up
                                this.parentNode.removeChild(this);
                                // adBlock is NOT enabled
                                resolve(false);
                        });
                document.body.appendChild(js);
        });
};
