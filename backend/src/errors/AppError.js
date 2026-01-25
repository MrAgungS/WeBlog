export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.status = statusCode;
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
