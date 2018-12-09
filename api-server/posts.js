const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "3f4820b9-6378-4a1c-85a0-a65f9083f472": {
    id: '3f4820b9-6378-4a1c-85a0-a65f9083f472',
    timestamp: 1500000000000,
    title: 'Tricks with JavaScript Destructuring',
    body: 'In order to understand the newer destructuring syntax introduced in ES6, let’s cover the “old” way. I’ll mention this a couple times throughout, but these are optional syntaxes that MAY help. There are still some use cases that are cleaner with the original methods, such as property accessors, and that is perfectly valid.',
    author: 'thingone',
    category: 'react',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  },
  "2dbe87c1-a116-480e-8d25-90c3b54256b0": {
    id: '2dbe87c1-a116-480e-8d25-90c3b54256b0',
    timestamp: 1520000000000,
    title: 'About Udacity Courses Format',
    body: 'Each course consists of several units comprising video lectures with closed captioning, in conjunction with integrated quizzes to help students understand concepts and reinforce ideas, as well as follow-up homework, which promotes a "learn by doing" model. Programming classes use the Python language; programming assignments are graded by automated grading programs on the Udacity servers.',
    author: 'thingone',
    category: 'udacity',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let filteredPosts = {}

    Object.keys(posts).forEach(key => {
      if (posts[key].category === category && !posts[key].deleted)
        filteredPosts[posts[key].id] = posts[key]
    })

    res(filteredPosts)
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)

    res(posts[id].deleted ? {} : { [posts[id].id]: posts[id] })
    
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token);
    let filteredPosts = {}

    Object.keys(posts).forEach(key => {
      if (!posts[key].deleted) {
        filteredPosts[posts[key].id] = posts[key]
      }
    })

    res(filteredPosts)
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
