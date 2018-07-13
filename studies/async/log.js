var log = function (content) {
    var p = document.createElement("p");
    p.innerHTML = content;
    document.body.appendChild(p);
};
var Loger = /** @class */ (function () {
    function Loger() {
        this.momentTimerHasBeenTriggered = null;
    }
    Loger.prototype.container = function () {
        return document.querySelector(this.containerSelector);
    };
    Loger.prototype.setContainerSelector = function (selector) {
        this.containerSelector = selector;
        return this;
    };
    Loger.prototype.triggerTimer = function () {
        this.momentTimerHasBeenTriggered = new Date();
        return this;
    };
    Loger.prototype.log = function (content) {
        var el = document.createElement("div");
        el.innerHTML = content;
        this.container().appendChild(el);
        return this;
    };
    Loger.prototype.clear = function () {
        this.momentTimerHasBeenTriggered = null;
        this.container().innerHTML = '';
        return this;
    };
    return Loger;
}());
var Logger = new Loger().setContainerSelector('div[id=log]');
