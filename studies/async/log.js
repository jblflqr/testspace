var log = function (content) {
    var p = document.createElement("p");
    p.innerHTML = content;
    document.body.appendChild(p);
};
var Logger = /** @class */ (function () {
    function Logger() {
        this.momentTimerHasBeenTriggered = null;
    }
    Logger.prototype.container = function () {
        return document.querySelector(this.containerSelector);
    };
    Logger.prototype.setContainerSelector = function (selector) {
        this.containerSelector = selector;
        return this;
    };
    Logger.prototype.triggerTimer = function () {
        this.momentTimerHasBeenTriggered = new Date();
        return this;
    };
    Logger.prototype.log = function (content) {
        var el = document.createElement("div");
        el.innerHTML = content;
        this.container().appendChild(el);
        return this;
    };
    Logger.prototype.clear = function () {
        this.momentTimerHasBeenTriggered = null;
        this.container().innerHTML = '';
        return this;
    };
    return Logger;
}());
