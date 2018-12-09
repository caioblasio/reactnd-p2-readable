const categories = require('./categories')
const posts = require('./posts')
const comments = require('./comments')
const bodyParser = require('body-parser')
var router = require('express').Router();

router.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

router.get('/categories', (req, res) => {
  categories.getAll(req.token)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.get('/:category/posts', (req, res) => {
  posts.getByCategory(req.token, req.params.category)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.get('/posts', (req, res) => {
  posts.getAll(req.token)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
               error: 'There was an error.'
        })
      }
    )
})

router.post('/posts', bodyParser.json(), (req, res) => {
  posts.add(req.token, req.body)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
               error: 'There was an error.'
        })
      }
    )
})

router.get('/posts/:id', (req, res) => {
  posts.get(req.token, req.params.id)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.delete('/posts/:id', (req, res) => {
  posts.disable(req.token, req.params.id)
    .then(post => comments.disableByParent(req.token, post))
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.post('/posts/:id', bodyParser.json(), (req, res) => {
  const { option } = req.body
  const id = req.params.id
  posts.vote(req.token, id, option)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.put('/posts/:id', bodyParser.json(), (req, res) => {
  posts.edit(req.token, req.params.id, req.body)
    .then(
      (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.get('/posts/:id/comments', (req, res) => {
  comments.getByParent(req.token, req.params.id)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.get('/comments/:id', (req, res) => {
  comments.get(req.token, req.params.id)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.put('/comments/:id', bodyParser.json(), (req, res) => {
  comments.edit(req.token, req.params.id, req.body)
    .then(
      (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.post('/comments', bodyParser.json(), (req, res) => {
  comments.add(req.token, req.body)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.post('/comments/:id', bodyParser.json(), (req, res) => {
  const { option } = req.body
  comments.vote(req.token, req.params.id, option)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.delete('/comments/:id', (req, res) => {
  comments.disable(req.token, req.params.id)
    .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )
})

router.all('*', (req, res) =>
  response.status(404).send({error: 'Not found.'})
)

module.exports = router