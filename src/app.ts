// Server Modules
import express from 'express';
import * as routes from './routes';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import {Article, User} from './models';

// Middleware modules
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

// Database environment
(<any>mongoose).Promise = global.Promise;
const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog'
const db = mongoose.connect(dbUrl)

const app = express();
app.locals.appTitle = 'blog-express'

// Using middlewares for database
app.use((req, res, next) => {
  if (!Article || !User) return next(new Error('No models.'))
  return next()
})

// Configuration of the server
app.set('appName', 'hello-advanced');
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Using Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'))
app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F',
  resave: true,
  saveUninitialized: true}))


// Authentication middleware
app.use((req, res, next) => {
  if (req.session && req.session.admin) {
    res.locals.admin = true
  }
  next()
})

// Authorization
const authorize: express.RequestHandler = (req, res, next) => {
  if (req.session && req.session.admin)
    return next()
  else
    return res.send(401)
}

if (app.get('env') === 'development') {
  app.use(errorHandler())
}

// Routes
app.get('/', routes.index)
app.get('/login', routes.user.login)
app.post('/login', routes.user.authenticate)
app.get('/logout', routes.user.logout)
app.get('/admin', authorize, routes.article.admin)
app.get('/post', authorize, routes.article.post)
app.post('/post', authorize, routes.article.postArticle)
app.get('/articles/:slug', routes.article.show)


// Routes for REST API
app.all('/api', authorize)
app.get('/api/articles', routes.article.list)
app.post('/api/articles', routes.article.add)
app.put('/api/articles/:id', routes.article.edit)
app.delete('/api/articles/:id', routes.article.del)


// Catching all the routes
app.all('*', (req, res) => {
  res.status(404).send()
})

// http.createServer(app).listen(app.get('port'), function(){
// console.log('Express server listening on port ' + app.get('port'));
// });


// Server init functions
const server = http.createServer(app)
const boot = function () {
  server.listen(app.get('port'), function () {
    console.info(`Express server listening on port ${app.get('port')}`)
  })
}
const shutdown = function () {
  server.close(process.exit)
}
if (require.main === module) {
  boot() // "node app.js" command
} else {
  console.info('Running app as a module')
}

let port = app.get('port')
export {boot, shutdown, port}