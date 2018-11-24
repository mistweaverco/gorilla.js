gorilla.ajax = function(opts) {
        "use strict";
        return new Promise((resolve, reject) => {
                let getTimestamp, xhr;
                opts = opts || {};
                opts.method = opts.method || "GET";
                opts.method = opts.method.toUpperCase();
                opts.cb = opts.cb || function() {};
                opts.params = opts.params || {};
                opts.requestContentType =
                        opts.requestContentType ||
                        "application/x-www-form-urlencoded";
                getTimestamp = function() {
                        return Math.floor(Date.now() / 1000);
                };
                const formatParams = function(p) {
                        let arr, key;
                        arr = [];
                        for (key in p) {
                                if (p.hasOwnProperty(key)) {
                                        arr.push(encodeURIComponent(key) +
                                                        "=" +
                                                        encodeURIComponent(p[key]));
                                }
                        }
                        return arr;
                };
                const formatHeaders = (h) => {
                        let arr, key;
                        arr = [];
                        for (key in h) {
                                if (h.hasOwnProperty(key)) {
                                        arr.push({
                                                key: key,
                                                value: h[key]
                                        });
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
                                opts.url =
                                        opts.url +
                                        "?_nocache=" +
                                        getTimestamp();
                        else
                                opts.url =
                                        opts.url +
                                        "&_nocache=" +
                                        getTimestamp();
                }
                xhr.open(opts.method, opts.url);
                xhr.setRequestHeader("Content-type", opts.requestContentType);
                if (opts.headers) {
                        const headers = formatHeaders(opts.headers);
                        headers.forEach((header) => {
                                xhr.setRequestHeader(header.key, header.value);
                        });
                }
                if (opts.method === "GET") {
                        xhr.send(null);
                } else if (params.length) xhr.send(params.join("&"));
                else xhr.send(null);
                xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                        resolve(xhr.responseText);
                                } else {
                                        reject(xhr);
                                }
                        }
                };
        });
};
