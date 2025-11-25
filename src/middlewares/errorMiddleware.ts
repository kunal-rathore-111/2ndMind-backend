import type { ErrorRequestHandler } from "express";
import { Prisma } from "../generated/prisma/client.js";



export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {

    const isProduction = process.env.NODE_ENV === 'production';


    let message = err.message || 'Something went wrong';
    let statusCode = Number(err.statusCode || err.status || 500);
    let errorType = err.errorType || 'ServerError';

    let shouldShown = err.shouldShown;

    let requestId = req.requestId || 'unknown';

    // prisma wrapped db errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

        switch (err.code) {
            case 'P2002': //Unique constraint failed
                statusCode = 409;
                errorType = 'Conflict'
                const target = err?.meta?.target;//gives array or single value eg- [emai] or [email, username...]

                const field = Array.isArray(target) ? target.join(', ') : target;
                shouldShown = true;
                message = `${field} already exists`
                break;

            case 'P2003': //Foreign key constraint failed
                statusCode = 409
                errorType = 'ForeignKeyViolation'
                message = 'Foreign key constraint failed'
                shouldShown = true;
                break;

            case 'P2025': //Record not found
                statusCode = 404;
                errorType = 'NotFound';
                message = 'Record not found';
                shouldShown = true;
                break;

            default:
                // other any error
                statusCode = 400
                shouldShown = true;
                errorType = 'DB error'
                message = err.message;
                break;
        }
    }
    else if (['23505', '23503', '22P02'].includes(err.code)) {
        // Fallback- handle Postgres SQLSTATE error codes if they surface
        switch (err.code) {
            case '23505': // unique_violation
                statusCode = 409;
                errorType = 'Conflict';
                message = 'Already Exists';
                shouldShown = true;
                break;
            case '23503': // foreign_key_violation
                statusCode = 409;
                errorType = 'ForeignKeyViolation';
                message = 'Foreign key constraint violation';
                shouldShown = true;
                break;
            case '22P02': // invalid_text_representation (e.g. bad UUID)
                statusCode = 400;
                errorType = 'BadRequest';
                message = 'Invalid input syntax';
                shouldShown = true;
                break;
            default:
                // leave defaults
                errorType = 'DB error'
                message = err.message;
                shouldShown = true;
                break;
        }
    }
    //jwt errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        errorType = 'Unauthorized';
        message = 'Invalid token';
        shouldShown = true;
    }
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        errorType = 'Unauthorized';
        message = 'Token expired';
        shouldShown = true;
    }

    const isServerError = statusCode >= 500;
    // to use in both clientside and serverside errors
    function showErrors() {
        console.error('requestId: ', requestId);
        console.error('statusCode: ', statusCode);
        console.error('errorType: ', errorType);
        console.error('Message: ', message);

        if (isServerError) console.error('Stack:', err?.stack);

        console.error('-----------------------');
    }

    if (isProduction) {
        if (isServerError) {
            console.error('----Server Side Error----');
            showErrors();

        }
        else {
            console.error('----Client Side Error----');
            showErrors();
        }
    } else {
        console.error('----Server Side Error----');
        showErrors();
    }


    if (isProduction && isServerError && !shouldShown) {
        statusCode = 500;
        errorType = 'ServerError';
        message = "Something went wrong"

    }

    res.status(statusCode).json({
        requestId,
        errorType,
        message,
        status: 'error'
    })
}

