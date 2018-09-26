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
