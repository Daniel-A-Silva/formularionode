var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactanosRouter = require('./routes/contactanos');
var visitanosRouter = require('./routes/visitanos');
var quienesomosRouter = require('./routes/quienesomos');
const { title } = require('process');

require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'123asd123asd123asd123asd',
  resave: false,
  saveUninitialized:true,
}))


app.get('/' , function (req,res){
  var conocido = Boolean (req.session.nombre)

  res.render('index', {
    title:'Inicio de sesion en Franchu Creations',
    conocido: conocido,
    nombre: req.session.nombre
  })
})

app.post('/ingresar', function(req,res){
  if (req.body.nombre){
    req.session.nombre = req.body.nombre 
  }
  res.redirect ('/'); 
});

app.get ('/salir', function (req, res){
req.session.destroy ();
res.redirect ('/');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contactanos', contactanosRouter);
app.use('/visitanos', visitanosRouter);
app.use('/quienesomos', quienesomosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
