var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var startSlowProcess = function () { return fillProgressBar(slowProgressBar(), 50); };
var startFastProcess = function () { return fillProgressBar(fastProgressBar(), 100); };
var fastProgressBar = function () { return document.querySelector('progress[name=fast]'); };
var slowProgressBar = function () { return document.querySelector('progress[name=slow]'); };
var fillProgressBar = function (bar, interval) {
    Logger.log("Promise (" + interval + "ms) started...");
    return new Promise(function (resolve) {
        var begin = new Date().valueOf();
        var progress = setInterval(function () {
            bar.value += 5;
            if (bar.value >= bar.max) {
                clearInterval(progress);
                resolve("Execution time : " + (new Date().valueOf() - begin) + " ms");
                Logger.log("Promise (" + interval + "ms) done !");
            }
        }, interval);
    });
};
var resetAll = function () {
    Logger.clear();
    fastProgressBar().value = 0;
    slowProgressBar().value = 0;
};
var sequentialStart = function () {
    return __awaiter(this, void 0, void 0, function () {
        var slow, fast;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetAll();
                    return [4 /*yield*/, startSlowProcess()];
                case 1:
                    slow = _a.sent();
                    return [4 /*yield*/, startFastProcess()];
                case 2:
                    fast = _a.sent();
                    Logger.log(slow);
                    Logger.log(fast);
                    return [2 /*return*/];
            }
        });
    });
};
var concurrentStart = function () {
    return __awaiter(this, void 0, void 0, function () {
        var slow, fast, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    resetAll();
                    slow = startSlowProcess();
                    fast = startFastProcess();
                    _b = (_a = Logger).log;
                    return [4 /*yield*/, slow];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = Logger).log;
                    return [4 /*yield*/, fast];
                case 2:
                    _d.apply(_c, [_e.sent()]); // waits for slow to finish, even though fast is already done!
                    return [2 /*return*/];
            }
        });
    });
};
var promiseAll = function () {
    resetAll();
    Promise.all([startSlowProcess(), startFastProcess()]).then(function (_a) {
        var slow = _a[0], fast = _a[1];
        Logger.log(slow);
        Logger.log(fast);
    });
};
var parallel = function () {
    resetAll();
    startSlowProcess().then(function (message) { return Logger.log(message); }); // in this case could be simply written as log(startSlowProcess());
    startFastProcess().then(function (message) { return Logger.log(message); });
};