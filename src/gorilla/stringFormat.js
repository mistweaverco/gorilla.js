gorilla.stringFormat = (() => {
        "use strict";
        return function(str, ...replace) {
                replace.forEach((re) => {
                        str = str.replace(/%[^ ]*/, re);
                });
                return str;
        };
})();
