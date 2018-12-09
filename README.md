# Readable Project

![Readable home page](https://raw.githubusercontent.com/caioblasio/nanodegree-react-p1-myreads/master/readable.png)
A Content App created as part of the Udacity React Developer Nanodegree. Written in React and styled with Material-UI. There is a simple server built in Node.js used to serve the react app all the APIs needed. The App is like a blog, where there are posts from pre-defined categories. One can add new posts, comment on posts, thumb a post up or down, view details of a single post and edit or delete posts. Redux is used for state management.
 [Click here to view the live demo](https://readable-caioblasio.herokuapp.com)

## Instructions

You can clone or download this repository. To run dev environment:

* install all project dependencies

```
npm install
```
* install all client project dependencies

```
cd client
npm install
npm install --only=dev
```
* start the development server

```
npm run dev
```

## Testing

The app has a test suite written with Jest & Enzyme that can be run with `npm run test`. A coverage report will be generated.