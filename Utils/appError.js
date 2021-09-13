class AppError extends Error {
    constructor(message, status, messageCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${status}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;