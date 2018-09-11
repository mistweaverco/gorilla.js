gorilla.getFileContents = function(file, cb) {
        "use strict";
        if (file) {
                let reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function(evt) {
                        cb(false, evt.target.result, file);
                };
                reader.onerror = function() {
                        cb("Error reading file", null, file);
                };
        } else {
                cb("file ref not found", null, null);
        }
};
