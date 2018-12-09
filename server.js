require('dotenv').config()

const express = require('express')
const cors = require('cors')
const config = require('./config')
const api = require('./api-server')

const app = express()

app.use(cors())
app.use('/api', api);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', PORT)
})
