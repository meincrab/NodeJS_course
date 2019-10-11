const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const index = require('./app/routes/index');
const users = require('./app/routes/users');

const app = express();
const passportFunction = require('./passportfunction');


// Käynnistä Mongodb ennen sovelluksen käyttöä. Sinne syntyy passportdb -niminen kanta
// ja users -niminen collection
mongoose.connect('mongodb://localhost/studentdb_google', { useMongoClient: true });

// Suoritetaan passport-funktio aina kun sovellus käynnistyy
// Haetaan Googlelta käyttäjän tiedot omaan passportdb -kantaan jos niitä ei siellä jo ole 
passportFunction(passport);

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'todellasalainensalasana', resave: true, saveUninitialized: true })); // sovelluksen sessio käyttöön
app.use(passport.initialize());
app.use(passport.session()); // passportin login-sessio
app.use(flash()); // passportin login-sessio tarvitsee

//reitit
app.use('/', index);
app.use('/users', users);
require('./app/routes/student.routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});