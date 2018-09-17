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
