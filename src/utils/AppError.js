class AppError {
    errorMessage;
    statusCode;
    constructor(errorMessage, statusCode = 400) {
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;
