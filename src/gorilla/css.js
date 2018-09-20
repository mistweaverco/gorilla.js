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
                        if (Reflect.has(def, "length")) {
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
