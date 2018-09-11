// eslint-disable-next-line
let gorilla = {};
gorilla.adBlockEnabled = function(cb) {
        "use strict";
        const js = document.createElement("script");
        js.src = "https://js.revsci.net/gateway/gw.js";
        js.onerror = function() {
                // adBlock is enabled
                cb(true);
                // clean up
                this.parentNode.removeChild(this);
        };
        js.onload = function() {
                // adBlock is NOT enabled
                cb(false);
                // clean up
                this.parentNode.removeChild(this);
        };
        document.body.appendChild(js);
};
gorilla.after = function(el, afterEl) {
        "use strict";
        el.parentNode.insertBefore(afterEl, el.nextElementSibling);
        return el;
};
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
gorilla.append = function(el, appendEl) {
        "use strict";
        if (appendEl.length) {
                appendEl.forEach(function(tmp) {
                        el.appendChild(tmp);
                });
        } else {
                el.appendChild(appendEl);
        }
        return el;
};
gorilla.attr = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (value) {
                el.setAttribute(key, value);
        } else {
                returnvalue = el.getAttribute(key);
        }
        return returnvalue;
};
gorilla.before = function(el, beforeEl) {
        "use strict";
        el.parentNode.insertBefore(beforeEl, el);
        return el;
};
gorilla.compareJSON = function(json1, json2) {
        "use strict";
        const _helper = function(a, b, prop) {
                if (typeof a[prop] === "object") {
                        if (!aIsInB(a[prop], b[prop])) {
                                return false;
                        }
                } else if (a[prop] !== b[prop]) {
                        return false;
                }
        };
        const aIsInB = function(a, b) {
                for (let prop in a) {
                        if (Reflect.has(prop, a)) {
                                if (Reflect.has(prop, b)) {
                                        return _helper(a, b, prop);
                                } else {
                                        return false;
                                }
                        }
                }
                return true;
        };
        return aIsInB(json1, json2) && aIsInB(json2, json1);
};
gorilla.create = function(name, contents, attrs, is) {
        "use strict";
        let attrsCallback, contentsCallback, el;
        if (is) el = document.createElement(name, is);
        else el = document.createElement(name);
        contentsCallback = function(content) {
                el.appendChild(content);
        };
        attrsCallback = function(attr) {
                el.setAttribute(attr[0], attr[1]);
        };
        if (contents) {
                if (typeof contents === "string") {
                        el.innerHTML = contents;
                } else if (typeof contents === "object" && contents.length) {
                        contents.forEach(contentsCallback);
                } else if (typeof contents === "object" && !contents.length) {
                        el.appendChild(contents);
                }
        }
        if (attrs) {
                attrs.forEach(attrsCallback);
        }
        return gorilla.find(el).get(0);
};
gorilla.domready = function(cb) {
        "use strict";
        if (document.readyState === "complete") {
                return window.setTimeout(cb, 1);
        } else {
                document.addEventListener("DOMContentLoaded", function() {
                        cb();
                });
        }
};
gorilla.each = function(arr, cb) {
        "use strict";
        let i = 0;
        let len = arr.length;
        for (; i < len; i++) {
                cb(arr[i], i);
        }
        return arr;
};
gorilla.find = function(sel, ref) {
        "use strict";
        let el_arr, els, i, len;
        el_arr = [];
        let forEachElementCallback = function(el) {
                el.find = function(sel1) {
                        return gorilla.find(sel1, this);
                };
                el.on = function(eventName, cb) {
                        return gorilla.on(this, eventName, cb);
                };
                el.attr = function(key, value) {
                        return gorilla.attr(this, key, value);
                };
                el.html = function(value) {
                        return gorilla.html(this, value);
                };
                el.prepend = function(prependEl) {
                        return gorilla.prepend(this, prependEl);
                };
                el.append = function(appendEl) {
                        return gorilla.append(this, appendEl);
                };
                el.after = function(afterEl) {
                        return gorilla.after(this, afterEl);
                };
                el.before = function(beforeEl) {
                        return gorilla.before(this, beforeEl);
                };
                el.parent = function() {
                        return gorilla.parent(this);
                };
                el.next = function() {
                        return gorilla.next(this);
                };
                el.prev = function() {
                        return gorilla.prev(this);
                };
                el.nodes = function() {
                        return gorilla.nodes(this);
                };
                el.remove = function() {
                        return gorilla.remove(this);
                };
                el_arr.push(el);
        };
        if (sel) {
                if (typeof sel !== "object") {
                        if (ref) {
                                els = ref.querySelectorAll(sel);
                        } else {
                                els = document.querySelectorAll(sel);
                        }
                } else if (sel.length) {
                        els = sel;
                } else {
                        els = [sel];
                }
                for (i = 0, len = els.length; i < len; i++) {
                        forEachElementCallback(els[i]);
                }
                el_arr.each = function(cb) {
                        return gorilla.each(this, cb);
                };
                el_arr.get = function(index) {
                        return this[index];
                };
        }
        return el_arr;
};
gorilla.getFileContents = function(file, cb) {
        "use strict";
        if (file) {
                let reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function(evt) {
                        cb(false, evt.target.result, file);
                };
                reader.onerror = function() {
                        cb("Error reading file", null, file);
                };
        } else {
                cb("file ref not found", null, null);
        }
};
gorilla.getUnixtime = function() {
        "use strict";
        return parseInt(Math.floor(Date.now() / 1000), 10);
};
gorilla.getUrlParams = function(url) {
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
gorilla.html = function(el, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (typeof value === "string") {
                el.innerHTML = value;
        } else {
                return el.innerHTML;
        }
        return returnvalue;
};
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
gorilla.next = function(el) {
        "use strict";
        return gorilla.find(el.nextElementSibling).get(0);
};
gorilla.nodes = function(el) {
        "use strict";
        let child, child_arr, i, len, ref;
        child_arr = [];
        ref = el.children;
        for (i = 0, len = ref.length; i < len; i++) {
                child = ref[i];
                child_arr.push(gorilla.find(child).get(0));
        }
        return child_arr;
};
gorilla.on = function(el, eventName, cb) {
        "use strict";
        el.addEventListener(eventName, cb, false);
        return el;
};
gorilla.parent = function(el) {
        "use strict";
        return gorilla.find(el.parentNode).get(0);
};
gorilla.plugins = {};
gorilla.prepend = function(el, prependEl) {
        "use strict";
        el.parentNode.insertBefore(prependEl, el);
        return el;
};
gorilla.prev = function(el) {
        "use strict";
        return gorilla.find(el.previousElementSibling).get(0);
};
gorilla.remove = function(el) {
        "use strict";
        el.parentNode.removeChild(el);
};
gorilla.version = "1.0.0";
