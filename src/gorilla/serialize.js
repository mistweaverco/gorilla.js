gorilla.serialize = (obj, opts) => {
        "use strict";
        opts = opts || {};
        if (obj.tagName && obj.tagName.toLowerCase() === "form") {
                let formData = new FormData(obj);
                let json = {};
                formData.forEach(function(value, key) {
                        json[key] = value;
                });
                return gorilla.serialize(json);
        }
        let str = [];
        let delimiter = opts.delimiter || "&";
        let q = opts.q || false;

        for (let key in obj) {
                if (Reflect.has(obj, key)) {
                        switch (typeof obj[key]) {
                                case "boolean":
                                case "string":
                                case "number":
                                        str[str.length] = key + "=" + obj[key];
                                        break;
                                case "object":
                                        str[str.length] = gorilla.serialize(
                                                obj[key],
                                                delimiter
                                        );
                                        break;
                                default:
                                        break;
                        }
                }
        }
        return (q === true ? "?" : "") + str.join(delimiter);
};
