/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
// const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

// 1.Global middlewares

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:'Too many requests from this IP,Please try again in an hour'
})
app.use('/api',limiter)

// Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));

// Data sanitization against nosql query injection
// app.use(mongoSanitize())

// Data sanitization against xss
app.use(xss())

app.use(hpp({
  whitelist:[
    'duration',
    'ratingAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}))

app.use(express.static('./public'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// Router mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in the server`,404));
});

app.use(globalErrorHandler);

module.exports = app;
