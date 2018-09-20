gorilla.serialize = (list, opts) => {
        "use strict";
        opts = opts || {};

        if (list.tagName && list.tagName === "FORM") {
                let datalist = {},
                        items = list.elements;
                gorilla.each(items, (el) => {
                        if (el.name && el.name !== "") {
                                datalist[el.name] = el.value;
                        }
                });
                return gorilla.serialize(datalist);
        }

        let data = [];
        let delimiter = opts.delimiter || "&";
        let q = opts.q || false;

        gorilla.each(list, (v, k) => {
                switch (typeof v) {
                        case "boolean":
                        case "string":
                        case "number":
                                if (opts.parentName) {
                                        data.push(opts.parentName +
                                                        "[" +
                                                        k +
                                                        "]=" +
                                                        encodeURIComponent(v));
                                } else {
                                        data.push(k + "=" + encodeURIComponent(v));
                                }
                                break;
                        case "object":
                                if (opts.parentName) {
                                        k = opts.parentName + "[" + k + "]";
                                }
                                data.push(gorilla.serialize(v, {
                                                delimiter: opts.delimiter,
                                                parentName: k
                                        }));
                                break;
                        default:
                                break;
                }
        });
        return (q === true ? "?" : "") + data.join(delimiter);
};
