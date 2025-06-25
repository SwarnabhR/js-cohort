// function setTimeoutPromisified(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function callback() {
//     console.log("I miss Beyza");
// }

// setTimeoutPromisified(3000).then(callback);

// function random(resolve) {
//     resolve();
// }

// let p = new Promise(random);

// function callback() {
//     console.log("Promise succeded");
// }
// p.then(callback);
// const fs = require("fs");

// function readTheFile(sendTheFinalValue) {
//     fs.readFile("beyza.txt", "utf-8", (err, data) => {
//         if (err) {
//             console.error(err);
//         }
//         sendTheFinalValue(data);
//     });
// }

// function readFile(fileName) {
//     return new Promise(readTheFile);
// }

// const p = readFile();

// function callback(content) {
//     console.log(content);
// }

// p.then(callback);

class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 'fulfilled' or 'rejected'
    this.value = undefined;
    this.reason = undefined;
    this.thenCallbacks = [];
    this.catchCallback = null;

    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.thenCallbacks.forEach(cb => cb(value));
    };

    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.reason = reason;
      if (this.catchCallback) this.catchCallback(reason);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(callback) {
    if (this.state === 'fulfilled') {
      callback(this.value);
    } else {
      this.thenCallbacks.push(callback);
    }
    return this; // allow chaining
  }

  catch(callback) {
    if (this.state === 'rejected') {
      callback(this.reason);
    } else {
      this.catchCallback = callback;
    }
    return this;
  }
}


const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data loaded successfully");
    } else {
      reject("Something went wrong");
    }
  }, 1000);
});

p.then(result => {
  console.log("Success:", result);
}).catch(err => {
  console.log("Error:", err);
});
