require("babel-core/register")
require("babel-polyfill")

var fetch = require('isomorphic-fetch')

function fetchReddit(topic) {
  const redditUrl= `https://www.reddit.com/r/${topic}.json`
  return new Promise((resolve,reject) => {
    fetch(redditUrl).then(response => response.json()).then(result => resolve(result.data.children))
  })
}

async function read(topic) {
  var json = await fetchReddit(topic)
  console.log(json)
}

read('home')
