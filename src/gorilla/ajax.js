gorilla.ajax = function(opts) {
        "use strict";
        let getTimestamp, header, xhr;
        opts = opts || {};
        opts.method = opts.method || "GET";
        opts.method = opts.method.toUpperCase();
        opts.cb = opts.cb || function() {};
        opts.params = opts.params || {};
        opts.requestContentType =
                opts.requestContentType || "application/x-www-form-urlencoded";
        getTimestamp = function() {
                return Math.floor(Date.now() / 1000);
        };
        const formatParams = function(p) {
                let arr, key;
                arr = [];
                for (key in p) {
                        if (Reflect.has(p, key)) {
                                arr.push(encodeURIComponent(key) +
                                                "=" +
                                                encodeURIComponent(p[key]));
                        }
                }
                return arr;
        };
        const params = formatParams(opts.params);
        xhr = new XMLHttpRequest();
        if (opts.method === "GET" && params.length) {
                opts.url = opts.url + "?" + params.join("&");
        }
        if (opts.method === "GET" && opts.cache === false) {
                if (opts.url.indexOf("?") === -1)
                        opts.url = opts.url + "?_nocache=" + getTimestamp();
                else opts.url = opts.url + "&_nocache=" + getTimestamp();
        }
        xhr.open(opts.method, opts.url);
        xhr.setRequestHeader("Content-type", opts.requestContentType);
        if (opts.headers) {
                for (header in opts.headers) {
                        if (Reflect.has(opts.headers, header)) {
                                xhr.setRequestHeader(header.key, header.value);
                        }
                }
        }
        if (opts.method === "GET") {
                xhr.send(null);
        } else if (params.length) xhr.send(params.join("&"));
        else xhr.send(null);
        xhr.onreadystatechange = function() {
                let DONE, OK, err;
                DONE = 4;
                OK = 200;
                err = false;
                if (xhr.readyState === DONE) {
                        if (xhr.status !== OK) err = xhr.status;
                        opts.cb(err, xhr.responseText);
                }
        };
};
