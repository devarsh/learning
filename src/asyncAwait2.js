require("babel-core/register")
require("babel-polyfill")

var fetch = require('isomorphic-fetch')

var fetchReddit = function(topic) {
  const redditUrl= `https://www.reddit.com/r/${topic}.json`
  return new Promise((resolve,reject) => {
    fetch(redditUrl)
    .then(response => response.json())
    .then(result => resolve(result.data.children))
    .catch(()=> {
      setTimeout(()=> {
        reject(new Error('Bolo su karso'))
      },10000)
    })
  })
}

const read = (topic) => async () => {
  try {
    var json = await fetchReddit(topic)
    return json
  } catch (err) {
    throw err
  }

}

const runner = async () => {
  try {
    let x = read('home')
    let y = read('play')
    var result = await x('home')
    var result2 = await y('play')
    console.log(result[0],result2[0])
  }
  catch(e) {
    console.log(e)
  }
}

runner()
