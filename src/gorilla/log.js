gorilla.log = (t) => {
        "use strict";
        t = t || "info";
        const colors = {
                info: {
                        bg: "#19cf85",
                        fg: "#272b30"
                },
                warn: {
                        bg: "#ffd866",
                        fg: "#272b30"
                },
                debug: {
                        bg: "#3c92d1",
                        fg: "#272b30"
                },
                error: {
                        bg: "#ff6188",
                        fg: "#272b30"
                }
        };
        if (t in colors === false) t = "info";
        const c = colors[t];
        return (...logs) => {
                window.console.log(
                        "%c🦍",
                        "background:" +
                                c.bg +
                                ";color:" +
                                c.fg +
                                ";padding:5px;",
                        logs
                );
        };
};
