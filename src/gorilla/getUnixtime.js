gorilla.getUnixtime = function() {
        "use strict";
        return parseInt(Math.floor(Date.now() / 1000), 10);
};
