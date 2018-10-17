gorilla.getParsedURL = function(url) {
        "use strict";
        const l = document.createElement("a");
        l.setAttribute("href", url);
        return {
                hash: l.hash,
                host: l.host,
                hostname: l.hostname,
                href: l.host,
                pathname: l.pathname,
                port: l.port && l.port.length > 0 ? l.port : undefined,
                protocol: l.protocol.replace(":", ""),
                search: l.search
        };
};
