const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression');
const xss = require('xss-clean')
const userRouter = require('./Router/userRouter')
const medicineRouter = require('./Router/medicineRouter')
const globalErrorHandler = require('./controllers/errorController')
const orderRouter = require('./Router/orderRouter')
const cookieParser = require('cookie-parser')
const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

}
app.use(cors())
app.options('*', cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(compression());
app.use(xss());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/medicine', medicineRouter);
app.use('/api/v1/orders', orderRouter);
app.use(globalErrorHandler);
module.exports = app;