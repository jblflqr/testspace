const {Observable, Subject, ReplaySubject, from, of, range, fromEvent} = rxjs;
const {map, filter, switchMap, scan} = rxjs.operators;


let startSlowProcess = () => fillProgressBar('Slow process', slowProgressBar(), 100);
let startFastProcess = () => fillProgressBar('Fast process', fastProgressBar(), 50);

let fastProgressBar = () => document.querySelector('progress[name=fast]');
let slowProgressBar = () => document.querySelector('progress[name=slow]');

var logger = new Logger().setContainerSelector('div[id=log]');

let fillProgressBar = (name, bar, interval) => {
  logger.log(`${name} started...`);
  return new Promise(resolve => {
    let begin = new Date().valueOf();
    let progress = setInterval(() => {
      bar.value += 5;
      if (bar.value >= bar.max) {
        clearInterval(progress);
        logger.log(`${name} done !`);
        resolve(`[${name} resolved] Execution time : ${new Date().valueOf() - begin} ms`);
      }
    }, interval)
  });
};

let resetAll = () => {
  logger.clear();
  fastProgressBar().value = 0;
  slowProgressBar().value = 0;
}

range(1, 10)
  .pipe(
    filter(x => x % 2 === 1),
    map(x => x + x)
  ).subscribe(x => console.log(x));


const scanButton = document.querySelector('#scanButton');

fromEvent(scanButton, 'click').pipe(
  scan(count => count + 1, 0)
).subscribe(count => logger.log(`Clicked ${count} times`));

let persons = [
  { firstname : "Roger",  lastname : "DURAND" },
  { firstname : "Nathalie",  lastname : "LEGRAND" },
  { firstname : "Damien",  lastname : "POIKH" }
];

// from(persons).subscribe(val => console.log(val));
let unFiltre = (p) => p.lastname.toLowerCase().includes('   k '.trim());
let myFilter = (p, prop, val) => p[prop].toLowerCase().includes(val.toLowerCase().trim());

let secondFiltre = (p) => myFilter(p, 'firstname', 'a');
let troisiemeFiltre = (p) => myFilter(p, 'lastname', '  k ');

from(persons)
  .pipe(
    filter(p => p.firstname.includes('')),
    filter(secondFiltre),
    filter(troisiemeFiltre)
  ).subscribe(val => console.log(val));