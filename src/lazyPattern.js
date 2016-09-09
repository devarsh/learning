//credits : https://github.com/pkrumins/node-lazy
var EventEmitter = require('events').EventEmitter
var util = require('util')

function Lazy() {
  if(!(this instanceof Lazy)) {
    return new Lazy()
  }
  EventEmitter.call(this)
  var self = this

  function newLazy(g,h) {
    if(!g) {
      g = () => { return true }
    }
    if(!h) {
      h = (x) => { return x }
    }
    var lazy = new Lazy()
    self.on('data',(x)=> {
      if(g.call(lazy,x)) {
        lazy.emit('data',h(x))
      }
    })
    return lazy
  }

  this.filter = (con) => {
    return newLazy((data)=>{
      return con(data)
    })
  }

  this.map = (con) => {
    return newLazy(
      ()=> { return true},
      (x)=> { return con(x) }
      )
  }
  this.join = (fn) => {
    return newLazy(
      ()=> { return true},
      (x)=> { return fn(x) }
      )
  }
  this.take = (x) => {
    return newLazy(()=>{
      if(x>0) {
        x--
        return true
      }
      else {
        return false
      }
    })
  }
}
util.inherits(Lazy,EventEmitter)

obj = new Lazy()

obj.filter(x=>x>2).map(x=>x*2).take(2).join((x)=>{console.log(x)})

var array = [1,2,3,4,5,6]

array.forEach(x=>{
  obj.emit('data',x)
})


