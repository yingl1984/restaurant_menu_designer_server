require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_URL} = require('./config')
const menuRouter = require('./menu/menu-router');
//Create a Express app
const app = express()
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
// Use Morgan, helmet, cors
app.use(morgan(morganOption))
app.use(helmet())
app.use(
    cors()
);
// Use menuRouter
app.use('/api/menu', menuRouter);

app.get('/', (req, res) => {
    res.send('Hello, restaurant menu designer user!')
})
//Error handler
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
    })
    
module.exports = app