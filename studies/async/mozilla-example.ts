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

var sequentialStart = async function () {
  resetAll();
  const slow = await startSlowProcess(); // If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.
  const fast = await startFastProcess();
  logger.log(slow)
  logger.log(fast);
}

var concurrentStart = async function () {
  resetAll();
  const slow = startSlowProcess(); // starts timer immediately
  const fast = startFastProcess();
  logger.log(await slow);
  logger.log(await fast); // waits for slow to finish, even though fast is already done!
}

var promiseAll = function () {
  resetAll();
  Promise.all([startSlowProcess(), startFastProcess()]).then(([slow, fast]) => {
    logger.log(slow);
    logger.log(fast);
  });
}

var parallel = function () {
  resetAll();
  startSlowProcess().then((message) => logger.log(message));
  startFastProcess().then((message) => logger.log(message));
}
