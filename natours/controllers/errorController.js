/* eslint-disable import/no-useless-path-segments */
const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = 'There is already a data exist with this name';
  return new AppError(message, 400);
};

const handleValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el=>el.message)
  const message = `Invalid inputs :${errors.join('. ')}`
  return new AppError(message,400)
};

const handleJWTError = ()=>new AppError('Invalid Token! Please login again',401)

const handleJWTExpiredError = ()=>new AppError('Your Token has expired! Please login again',401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    // errorName:err.name,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOpertaional) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.name === 'ValidationError') err = handleValidatorErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if(err.name === 'JsonWebTokenError') err = handleJWTError();
    if(err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    sendErrorProd(err, res);
  }
};
