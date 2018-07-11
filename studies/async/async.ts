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
    log(`promise result: ${value}`);
  });
  log('I will not wait until promise is resolved');
}

getValueWithPromise();

// Async
async function getValueWithAsync() {
  const value = <number> await this.resolveAfter2Seconds(20);
  log(`async result: ${value}`);
  log('I waited promise to be resolved');
}

getValueWithAsync().then(() => {console.log('appel terminé')});
