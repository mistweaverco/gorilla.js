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
                                if (opts.parentName) {
                                        data.push(opts.parentName +
                                                        "[" +
                                                        v[0] +
                                                        "]=" +
                                                        encodeURIComponent(v[1]));
                                } else {
                                        data.push(v[0] +
                                                        "=" +
                                                        encodeURIComponent(v[1]));
                                }
                                break;
                        case "object":
                                if (v[1].length) {
                                        if (opts.parentName) {
                                                v[0] =
                                                        opts.parentName +
                                                        "[" +
                                                        v[0] +
                                                        "]";
                                        }
                                        data.push(gorilla.serialize(v[1], {
                                                        delimiter:
                                                                opts.delimiter,
                                                        parentName: v[0]
                                                }));
                                }
                                break;
                        default:
                                break;
                }
        });
        return (q === true ? "?" : "") + data.join(delimiter);
};
