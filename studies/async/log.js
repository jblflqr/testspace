var log = function (content) {
    var p = document.createElement("p");
    p.innerHTML = content;
    document.body.appendChild(p);
};
var Logger = {
    container: 'div[id=log]',
    log: function (content) {
        var el = document.createElement("div");
        el.innerHTML = content;
        document.querySelector(Logger.container).appendChild(el);
    },
    clear: function () {
        document.querySelector(Logger.container).innerHTML = '';
    }
};
