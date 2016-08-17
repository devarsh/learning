require("babel-core/register");
require("babel-polyfill");


const myFn = function* () {
  const a = yield returnRandomNumbers()
  const b = yield returnRandomNumbers()
  const c = yield returnRandomNumbers()
  console.log(a,b,c)
}



const returnRandomNumbers = () => {
  return new Promise((res,rej)=> {
    setTimeout(()=>{
      res(Math.trunc(Math.random()*10))
    },1000)
  })
}



const wrapAsync = generator => () => {
  const obj = generator.apply(this,arguments)

  const handle = (result) => {
    if(result.done) {
      return Promise.resolve(result.value)
    }
    return Promise.resolve(result.value).then((res) => {
      return handle(obj.next(res))
    },
    (err) => {
      return handle(obj.throw(err))
    })
  }

  try {
    handle(obj.next())
  } catch(ex) {
    return Promise.reject(ex)
  }
}

var newFn = wrapAsync(myFn)
newFn()
