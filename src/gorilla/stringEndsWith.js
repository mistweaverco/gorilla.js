gorilla.stringEndsWith = (haystack, needle) => {
        "use strict";
        return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
};
