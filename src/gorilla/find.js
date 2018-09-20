gorilla.find = function(sel, ref) {
        "use strict";
        let el_arr, els, i, len;
        el_arr = [];
        let forEachElementCallback = function(el) {
                el.find = function(sel1) {
                        return gorilla.find(sel1, this);
                };
                el.data = function(k, v) {
                        return gorilla.data(this, k, v);
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
                el.css = function(def) {
                        return gorilla.css(this, def);
                };
                el.offset = function() {
                        return gorilla.offset(this);
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
