// Synchronous Example

// function sum(a, b) {
//     return a + b;
// }

// let ans = sum(5, 6);
// console.log(ans);

// function sum(n) {
//     let ans = 0;
//     for (let i = 1; i <= n; i++) {
//         ans += i;
//     }
//     return ans;
// }

// console.log(sum(5));

const fs = require("fs");

const content = fs.readFile("beyza.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

console.log("Beyza lover");