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
