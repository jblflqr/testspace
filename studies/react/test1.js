var Observable = rxjs.Observable, Subject = rxjs.Subject, ReplaySubject = rxjs.ReplaySubject, from = rxjs.from, of = rxjs.of, range = rxjs.range;
var _a = rxjs.operators, map = _a.map, filter = _a.filter, switchMap = _a.switchMap;
range(1, 200)
    .pipe(filter(function (x) { return x % 2 === 1; }), map(function (x) { return x + x; }))
    .subscribe(function (x) { return console.log(x); });
