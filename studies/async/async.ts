var logger = new Logger().setContainerSelector('div[id=log]');

// Promise
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

function getValueWithPromise() {
  resolveAfter2Seconds(20).then(value => {
    logger.log(`promise result: ${value}`);
  });
  logger.log('I will not wait until promise is resolved');
}

getValueWithPromise();

// Async
async function getValueWithAsync() {
  const value = <number> await this.resolveAfter2Seconds(20);
  logger.log(`async result: ${value}`);
  logger.log('I waited promise to be resolved');
}

getValueWithAsync().then(() => {
  logger.log('appel terminé')
});
