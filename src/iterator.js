require("babel-core/register");
require("babel-polyfill");

const fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1
        return {
           next () {
               [ pre, cur ] = [ cur, pre + cur ]
               return { done: false, value: cur }
           }
        }
    }
}


for (let n of fibonacci) {
    if (n > 1000)
        break
    console.log(n)
}

for (let x of fibonacci) {
  if(x > 2000)
    break
  console.log(x)
}
