const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const cors = require('../middleware/koa-cors')
const cors = require('koa2-cors');
const useRouters = require('../router')
const errorHandler = require('./error-handle')

const app = new Koa()
// app.use(cors)
app.use(cors());
app.useRouters = useRouters

app.use(bodyParser())
app.useRouters()

app.on('error', errorHandler)

module.exports = app