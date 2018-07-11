var resolveAfter2Seconds = function() {
  log("starting slow promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(20);
      log("slow promise is done");
    }, 2000);
  });
};

var resolveAfter1Second = function() {
  log("starting fast promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(10);
      log("fast promise is done");
    }, 1000);
  });
};

var sequentialStart = async function() {
  log('==SEQUENTIAL START==');
  const slow = await resolveAfter2Seconds(); // If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.
  const fast = await resolveAfter1Second();
  log(slow);
  log(fast);
}

var concurrentStart = async function() {
  log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second();

  log(await slow);
  log(await fast); // waits for slow to finish, even though fast is already done!
}

var stillSerial = function() {
  log('==CONCURRENT START with Promise.all==');
  Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(([slow, fast]) => {
    log(slow);
    log(fast);
  });
}

var parallel = function() {
  log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>log(message)); // in this case could be simply written as log(resolveAfter2Seconds());
  resolveAfter1Second().then((message)=>log(message));
}

sequentialStart(); // takes 2+1 seconds in total
// wait above to finish
setTimeout(concurrentStart, 4000); // takes 2 seconds in total
// wait again
setTimeout(stillSerial, 7000); // same as before
// wait again
setTimeout(parallel, 10000); // trully parallel