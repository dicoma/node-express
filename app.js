var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// MongoDB 연결
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PW}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
console.error('MongoDB connection error:', err);
});


// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure('views', { 
  express: app,
  watch: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);


// 라우팅
const userRoutes = require('./routes/userRoutes');
const emotionRoutes = require('./routes/emotionRoutes');
const emotionTriggersRoutes = require('./routes/emotionTriggersRoutes');
const communityPostsRoutes = require('./routes/communityPostsRoutes');

app.get('/api', (req, res) => {
  res.json({ status: "online" });
});
app.use('/api/users', userRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/emotiontriggers', emotionTriggersRoutes);
app.use('/api/communityposts', communityPostsRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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
