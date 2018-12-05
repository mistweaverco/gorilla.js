gorilla.getRandomNumber = function(min, max) {
        "use strict";
        min = min || 0;
        max = max || Number.MAX_SAFE_INTEGER;
        const a = max - min;
        const b = Math.random() * a;
        return Math.round(b + min);
};
