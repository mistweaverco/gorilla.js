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
