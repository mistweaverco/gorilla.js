gorilla.copyToClipboard = function(data) {
        "use strict";
        const dummyTextArea = gorilla.create("textarea").css({
                position: "absolute",
                top: "-2px",
                left: "-2px",
                height: "1px",
                width: "1px",
                border: "0 none"
        });
        document.body.appendChild(dummyTextArea);
        dummyTextArea.value = data;
        dummyTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(dummyTextArea);
};
