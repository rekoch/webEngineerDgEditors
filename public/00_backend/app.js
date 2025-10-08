// Load environment variables first
require('dotenv').config();

const createError = require('http-errors');
const { corsMiddleware } = require('./utils/corsMiddleware.js');
const { swaggerRouter } = require('./utils/swagger.js');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// CORS Middleware
app.use(cors());
app.use(corsMiddleware);

// Swagger API Documentation
app.use(swaggerRouter);

// Standard Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route Handlers
const { routeHandler } = require('./routes/routeHandlers');
routeHandler(app);

// Global async error handler - fängt unbehandelte Promise rejections ab
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Anwendung gracefully beenden
  process.exit(1);
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
  res.render('error', { 
    title: 'Error',
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
