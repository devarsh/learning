var fetch = require('isomorphic-fetch')

export function fetchReddit(topic) {
  const redditUrl= `https://www.reddit.com/r/${topic}.json`
  return new Promise((resolve,reject) => {
    fetch(redditUrl).then(response => response.json()).then(result => resolve(result.data.children))
  })
}


var res = fetchReddit('wow')

res.then(res => console.log(res))
