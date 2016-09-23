require("regenerator-runtime/runtime")

var fetch = require('isomorphic-fetch')

var fetchReddit = function(topic) {
  const redditUrl= `https://www.reddit.com/r/${topic}.json`
  return new Promise((resolve,reject) => {
    fetch(redditUrl).then(response => response.json()).then(result => resolve(result.data.children))
  })
}

var read = async function (topic) {
  var json = await fetchReddit(topic)
  console.log(json)
}

read('home')
