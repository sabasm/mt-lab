require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require('./helpers/passport')
const session = require('express-session')
const cors = require('cors')
const MongoStore = require('connect-mongo')(session);


mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Conectado a DB`)
  })
  .catch(err => {
    console.error('Error conectando a DB', err)
  });

  const app_name = require('./package.json').name;
  const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
  
  const app = express();
  
  app.use(cors({
    credentials:true,
    origin: true
  }))
  
  // Middleware Setup
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  app.use(session({
    store: new MongoStore({
      mongooseConnection:mongoose.connection,
      ttl:86400
    }),
    secret:'PitayaKino24',
    resave:true,
    saveUninitialized:true,
    cookie:{httpOnly:true,maxAge:86400}  
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  // Express View engine setup
  
  app.use(require('node-sass-middleware')({
    src:  path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
  }));
        
  
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
  //git not pushing to heroku
  
  
  // default value for title local
  app.locals.title = 'MT-Lab';
  const updates = require('./helpers/updates')
  const searchfor = require('./helpers/searchFor')
  const lookfor = require('./helpers/lookFor')
  const pay = require('./helpers/payments')
  const auth = require ('./routes/auth/auth')
  const index = require('./routes/index');
  app.use('/update',updates)
  app.use('/lookfor',lookfor)
  app.use('/searchfor',searchfor)
  app.use('/pay',pay)
  app.use('/auth',auth)
  app.use('/', index);
  
  
  module.exports = app;
    