// eslint-disable-next-line
let gorilla = {};
gorilla.after = function(el, afterEl) {
        "use strict";
        el.parentNode.insertBefore(afterEl, el.nextElementSibling);
        return el;
};
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
        if (typeof value !== "undefined") {
                if (typeof value === "object") {
                        value = JSON.stringify(value);
                }
                el.setAttribute(key, String(value));
        } else if (typeof key === "object") {
                if (key.length) {
                        let list = {};
                        gorilla.each(key, (k) => {
                                list[k] = el.getAttribute(k);
                        });
                        returnvalue = list;
                } else {
                        gorilla.each(key, (v, k) => {
                                el.setAttribute(k, String(v));
                        });
                }
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
                        if (prop.hasOwnProperty(a)) {
                                if (prop.hasOwnProperty(b)) {
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
gorilla.copyToClipboard = function(data) {
        "use strict";
        const dummyTextArea = gorilla.create("textarea").css({
                position: "absolute",
                top: "-2px",
                left: "-2px",
                height: "1px",
                width: "1px",
                border: "0 none"
        });
        document.body.appendChild(dummyTextArea);
        dummyTextArea.value = data;
        dummyTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(dummyTextArea);
};
gorilla.create = function(name, options) {
        "use strict";
        let el;
        if (options) {
                el = document.createElement(name, options);
        } else {
                el = document.createElement(name);
        }
        return gorilla.find(el).get(0);
};
gorilla.css = function(el, def) {
        "use strict";
        let stylestr = "";
        let returnvalue = el;
        let s;
        switch (typeof def) {
                case "string":
                        s = window.getComputedStyle(el);
                        returnvalue = s.getPropertyValue(def);
                        break;
                case "object":
                        if (def.length) {
                                s = window.getComputedStyle(el);
                                returnvalue = {};
                                gorilla.each(def, (csskey) => {
                                        returnvalue[
                                                csskey
                                        ] = s.getPropertyValue(csskey);
                                });
                        } else {
                                gorilla.each(def, (cssvalue, csskey) => {
                                        stylestr =
                                                stylestr +
                                                csskey +
                                                ":" +
                                                cssvalue +
                                                ";";
                                });
                                el.setAttribute("style", stylestr);
                        }
                        break;
                case "undefined":
                        s = window.getComputedStyle(el);
                        returnvalue = {};
                        gorilla.each(s, (csskey) => {
                                returnvalue[csskey] = s.getPropertyValue(csskey);
                        });
                        break;
                default:
                        break;
        }
        return returnvalue;
};
gorilla.data = function(el, key, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        if (typeof value !== "undefined") {
                if (typeof value === "object") {
                        value = JSON.stringify(value);
                }
                el.setAttribute("data-" + key, String(value));
        } else if (typeof key === "object") {
                if (key.length) {
                        let list = {};
                        gorilla.each(key, (k) => {
                                list[k] = el.getAttribute("data-" + k);
                        });
                        returnvalue = list;
                } else {
                        gorilla.each(key, (v, k) => {
                                if (typeof v === "object") {
                                        v = JSON.stringify(v);
                                }
                                el.setAttribute("data-" + k, String(v));
                        });
                }
        } else {
                returnvalue = el.getAttribute("data-" + key);
        }
        return returnvalue;
};
gorilla.DOMReady = function(cb) {
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
        if (arr.length) {
                let i = 0;
                let len = arr.length;
                for (; i < len; i++) {
                        cb(arr[i], i);
                }
        } else {
                for (let k in arr) {
                        if (arr.hasOwnProperty(k)) {
                                cb(arr[k], k);
                        }
                }
        }
        return arr;
};
gorilla.find = function(sel, ref) {
        "use strict";
        let el_arr, els, i, len;
        el_arr = [];
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
                        if (els[i].__isGorillafiedEl === undefined) {
                                el_arr.push(gorilla.one(els[i]));
                        } else {
                                el_arr.push(els[i]);
                        }
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
gorilla.getImageData = function(url) {
        "use strict";
        return new Promise((resolve, reject) => {
                let img;
                img = new Image();
                img.onload = function() {
                        resolve({
                                width: this.width,
                                height: this.height
                        });
                };
                img.onerror = function(e) {
                        reject(e);
                };
                img.src = url;
        });
};
gorilla.getParsedURL = function(url) {
        "use strict";
        const l = document.createElement("a");
        l.setAttribute("href", url);
        return {
                hash: l.hash,
                host: l.host,
                hostname: l.hostname,
                href: l.host,
                pathname: l.pathname,
                port: l.port && l.port.length > 0 ? l.port : undefined,
                protocol: l.protocol.replace(":", ""),
                search: l.search
        };
};
gorilla.getRandomNumber = function(min, max) {
        "use strict";
        min = min || 0;
        max = max || Number.MAX_SAFE_INTEGER;
        const a = max - min;
        const b = Math.random() * a;
        return Math.round(b + min);
};
gorilla.getUnixtime = function() {
        "use strict";
        return parseInt(Math.floor(Date.now() / 1000), 10);
};
gorilla.getURLParams = function(url) {
        "use strict";
        url = url || window.location.search;
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
gorilla.height = function(el, val) {
        "use strict";
        let returnvalue = el;
        if (val === undefined) {
                returnvalue = el.getBoundingClientRect().height;
        } else {
                el.style.height = val + "px";
        }
        return returnvalue;
};
gorilla.html = function(el, value) {
        "use strict";
        const valueType = typeof value;
        let returnvalue;
        returnvalue = el;
        switch (valueType) {
                case "string":
                case "boolean":
                case "number":
                        el.innerHTML = value;
                        break;
                case "undefined":
                        returnvalue = el.innerHTML;
                        break;
                default:
                        returnvalue = false;
                        break;
        }
        return returnvalue;
};
gorilla.inArray = function(arr, needle) {
        "use strict";
        let retval = false;
        if (arr.length) {
                let i = 0;
                let len = arr.length;
                for (; i < len; i++) {
                        if (arr[i] === needle) {
                                retval = true;
                        }
                }
        }
        return retval;
};
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
gorilla.log = (t) => {
        "use strict";
        t = t || "info";
        const colors = {
                info: {
                        bg: "#19cf85",
                        fg: "#272b30"
                },
                warn: {
                        bg: "#ffd866",
                        fg: "#272b30"
                },
                debug: {
                        bg: "#3c92d1",
                        fg: "#272b30"
                },
                error: {
                        bg: "#ff6188",
                        fg: "#272b30"
                }
        };
        if (t in colors === false) t = "info";
        const c = colors[t];
        return (...logs) => {
                window.console.log(
                        "%c🦍",
                        "background:" +
                                c.bg +
                                ";color:" +
                                c.fg +
                                ";padding:5px;",
                        ...logs
                );
        };
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
gorilla.offset = function(el) {
        "use strict";
        const _offset = el.getBoundingClientRect();
        return {
                top: _offset.top,
                left: _offset.left
        };
};
gorilla.one = function(sel, ref) {
        "use strict";
        let el = null;
        let addCustomMethodsToDOMNode = function(domNode) {
                domNode.find = function(sel1) {
                        return gorilla.find(sel1, this);
                };
                domNode.data = function(k, v) {
                        return gorilla.data(this, k, v);
                };
                domNode.on = function(eventName, cb) {
                        return gorilla.on(this, eventName, cb);
                };
                domNode.attr = function(key, value) {
                        return gorilla.attr(this, key, value);
                };
                domNode.html = function(value) {
                        return gorilla.html(this, value);
                };
                domNode.prepend = function(prependEl) {
                        return gorilla.prepend(this, prependEl);
                };
                domNode.append = function(appendEl) {
                        return gorilla.append(this, appendEl);
                };
                domNode.after = function(afterEl) {
                        return gorilla.after(this, afterEl);
                };
                domNode.before = function(beforeEl) {
                        return gorilla.before(this, beforeEl);
                };
                domNode.parent = function() {
                        return gorilla.parent(this);
                };
                domNode.next = function() {
                        return gorilla.next(this);
                };
                domNode.prev = function() {
                        return gorilla.prev(this);
                };
                domNode.nodes = function() {
                        return gorilla.nodes(this);
                };
                domNode.one = function(sel1) {
                        return gorilla.one(sel1, this);
                };
                domNode.remove = function() {
                        return gorilla.remove(this);
                };
                domNode.css = function(def) {
                        return gorilla.css(this, def);
                };
                domNode.width = function(val) {
                        return gorilla.width(this, val);
                };
                domNode.height = function(val) {
                        return gorilla.height(this, val);
                };
                domNode.offset = function() {
                        return gorilla.offset(this);
                };
                domNode.__isGorillafiedEl = true;
        };
        if (sel) {
                switch (typeof sel) {
                        case "object":
                                el = sel;
                                break;
                        case "string":
                                if (ref) {
                                        el = ref.querySelector(sel);
                                } else {
                                        el = document.querySelector(sel);
                                }
                                break;
                        default:
                                break;
                }
                if (el && el.__isGorillafiedEl === undefined) {
                        addCustomMethodsToDOMNode(el);
                }
        }
        return el;
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
gorilla.serialize = (list, opts) => {
        "use strict";
        opts = opts || {};

        if (list.tagName && list.tagName === "FORM") {
                let datalist = {},
                        items = list.elements;
                gorilla.each(items, (el) => {
                        if (el.name && el.name !== "") {
                                datalist[el.name] = el.value;
                        }
                });
                return gorilla.serialize(datalist);
        }

        let data = [];
        let delimiter = opts.delimiter || "&";
        let q = opts.q || false;

        gorilla.each(list, (v, k) => {
                switch (typeof v) {
                        case "boolean":
                        case "string":
                        case "number":
                                if (opts.parentName) {
                                        data.push(opts.parentName +
                                                        "[" +
                                                        k +
                                                        "]=" +
                                                        encodeURIComponent(v));
                                } else {
                                        data.push(k + "=" + encodeURIComponent(v));
                                }
                                break;
                        case "object":
                                if (opts.parentName) {
                                        k = opts.parentName + "[" + k + "]";
                                }
                                data.push(gorilla.serialize(v, {
                                                delimiter: opts.delimiter,
                                                parentName: k
                                        }));
                                break;
                        default:
                                break;
                }
        });
        return (q === true ? "?" : "") + data.join(delimiter);
};
gorilla.stringEndsWith = (haystack, needle) => {
        "use strict";
        return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
};
gorilla.stringFormat = (() => {
        "use strict";
        return function(str, ...replace) {
                replace.forEach((re) => {
                        str = str.replace(/%[^ ]*/, re);
                });
                return str;
        };
})();
gorilla.version = "2.4.0";
gorilla.waitForElementToBePresent = function(sel, cb, opts) {
        "use strict";
        opts = opts || {};
        opts.timeout = opts.timeout || 5000;
        opts.interval = opts.interval || 250;
        return setTimeout(() => {
                const el = document.querySelector(sel);
                if (el === null) {
                        if (opts.timeout !== Number.Infinity) {
                                opts.timeout -= opts.interval;
                        }
                        if (opts.timeout > 0) {
                                gorilla.waitForElementToBePresent(
                                        sel,
                                        cb,
                                        opts
                                );
                        } else {
                                cb("Could not find " + sel, null);
                        }
                } else {
                        cb(false, el);
                }
        }, opts.interval);
};
gorilla.width = function(el, val) {
        "use strict";
        let returnvalue = el;
        if (val === undefined) {
                returnvalue = el.getBoundingClientRect().width;
        } else {
                el.style.width = val + "px";
        }
        return returnvalue;
};
