gorilla.html = function(el, value) {
        "use strict";
        let returnvalue;
        returnvalue = el;
        switch (typeof value === "string") {
                case "string":
                case "boolean":
                case "number":
                        el.innerHTML = value;
                        break;
                default:
                        returnvalue = false;
                        break;
        }
        return returnvalue;
};
