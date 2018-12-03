gorilla.getImageData = function(url) {
        "use strict";
        return new Promise((resolve, reject) => {
                let img;
                img = new Image();
                img.onload = function() {
                        resolve({
                                width: this.width,
                                height: this.height
                        });
                };
                img.onerror = function(e) {
                        reject(e);
                };
                img.src = url;
        });
};
