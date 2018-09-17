gorilla.serialize = (arr, opts) => {
        "use strict";
        opts = opts || {};

        if (arr.tagName && arr.tagName === "FORM") {
                let array = [],
                        items = arr.elements;
                gorilla.each(items, (el) => {
                        if (el.name && el.name !== "") {
                                array.push([el.name, el.value]);
                        }
                });
                return gorilla.serialize(array);
        }

        let data = [];
        let delimiter = opts.delimiter || "&";
        let q = opts.q || false;

        gorilla.each(arr, (v) => {
                switch (typeof v[1]) {
                        case "boolean":
                        case "string":
                        case "number":
                                data.push(v[0] + "=" + encodeURIComponent(v[1]));
                                break;
                        case "object":
                                if (v[1].length) {
                                        data.push(gorilla.serialize(v[1], {
                                                        delimiter:
                                                                opts.delimiter
                                                }));
                                }
                                break;
                        default:
                                break;
                }
        });
        return (q === true ? "?" : "") + data.join(delimiter);
};
