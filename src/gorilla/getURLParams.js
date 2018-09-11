gorilla.getURLParams = function(url) {
        "use strict";
        let params = {};
        let link = document.createElement("a");
        link.setAttribute("href", url);
        let queryString = link.search;
        if (queryString.length === 0) return params;
        if (queryString.indexOf("?") === 0)
                queryString = queryString.substring(1);
        queryString.split("&").forEach(function(param) {
                let p = param.split("=");
                params[p[0].toString()] = p[1];
        });
        return params;
};
