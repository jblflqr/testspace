var Observable = rxjs.Observable, Subject = rxjs.Subject, ReplaySubject = rxjs.ReplaySubject, from = rxjs.from, of = rxjs.of, range = rxjs.range, fromEvent = rxjs.fromEvent;
var _a = rxjs.operators, map = _a.map, filter = _a.filter, switchMap = _a.switchMap, scan = _a.scan;
var startSlowProcess = function () { return fillProgressBar('Slow process', slowProgressBar(), 100); };
var startFastProcess = function () { return fillProgressBar('Fast process', fastProgressBar(), 50); };
var fastProgressBar = function () { return document.querySelector('progress[name=fast]'); };
var slowProgressBar = function () { return document.querySelector('progress[name=slow]'); };
var logger = new Logger().setContainerSelector('div[id=log]');
var fillProgressBar = function (name, bar, interval) {
    logger.log(name + " started...");
    return new Promise(function (resolve) {
        var begin = new Date().valueOf();
        var progress = setInterval(function () {
            bar.value += 5;
            if (bar.value >= bar.max) {
                clearInterval(progress);
                logger.log(name + " done !");
                resolve("[" + name + " resolved] Execution time : " + (new Date().valueOf() - begin) + " ms");
            }
        }, interval);
    });
};
var resetAll = function () {
    logger.clear();
    fastProgressBar().value = 0;
    slowProgressBar().value = 0;
};
range(1, 10)
    .pipe(filter(function (x) { return x % 2 === 1; }), map(function (x) { return x + x; })).subscribe(function (x) { return console.log(x); });
var scanButton = document.querySelector('#scanButton');
fromEvent(scanButton, 'click').pipe(scan(function (count) { return count + 1; }, 0)).subscribe(function (count) { return logger.log("Clicked " + count + " times"); });
