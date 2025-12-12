
// global apperror class for differ the backend or user errors
export default class AppError extends Error {

    statusCode: number;
    errorType: string;
    shouldShown: boolean;

    constructor(message: string, statusCode: number, errorType: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.shouldShown = true;

        Error.captureStackTrace(this, this.constructor);// this for the error line from where the error thrown and this.constructor to exclude constructor
    }
}
