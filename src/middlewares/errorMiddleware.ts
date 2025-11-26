import type { ErrorRequestHandler } from "express";


export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {

    const isProduction = process.env.NODE_ENV === 'production';


    let message = err?.message || 'Something went wrong';
    let statusCode = Number(err?.statusCode || err?.status || 500);
    let errorType = err?.errorType || 'ServerError';

    let shouldShown = err?.shouldShown;

    let requestId = req?.requestId || 'unknown';

    const sqlCode = typeof err?.code === "string" && err.code || typeof err?.cause?.code === "string" && err.cause.code;

    if (['23505', '23503', '22P02'].includes(sqlCode || '')) { /* use sqlCode in switch */ }

    if (sqlCode) {
        // Fallback- handle Postgres SQLSTATE error codes if they surface
        // creating the constraint original columns
        const constraint_fieldMap: Record<string, string> = {
            usersTable_email_unique: 'email',
            linkTable_userId_unique: 'link'
        }
        switch (sqlCode) {
            case '23505': // unique_violation
                statusCode = 409;
                errorType = 'Conflict';
                const constraint = err?.cause?.constraint_name || "value";
                const field = constraint_fieldMap[constraint] || 'value'

                message = `${field} already exists`;
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
                message = err?.message || message;
                shouldShown = true;
                break;
        }
    }

    // Drizzle errors (query/validation)
    if (err?.name === 'DrizzleError') {
        statusCode = Math.max(400, statusCode);
        errorType = 'BadRequest';
        message = err?.message || message;
        shouldShown = true;
    }


    //jwt errors
    if (err?.name === 'JsonWebTokenError') {
        statusCode = 401;
        errorType = 'Unauthorized';
        message = 'Invalid token';
        shouldShown = true;
    }
    if (err?.name === 'TokenExpiredError') {
        statusCode = 401;
        errorType = 'Unauthorized';
        message = 'Token expired';
        shouldShown = true;
    }

    const originalStatus = Number(err?.statusCode || err?.status || 500);
    const isServerError = originalStatus >= 500;
    const responseStatus = isServerError ? 500 : originalStatus;

    // to use in both clientside and serverside errors
    function showErrors() {
        console.error('requestId: ', requestId);
        console.error('statusCode: ', statusCode);
        console.error('errorType: ', errorType);
        console.error('Message: ', message);

        if (isServerError) {
            console.error('Stack:', err?.stack);
            console.error("\n\n\nCOMPLETE Error-\n", err)
        }

        console.error('-----------------------');
    }

    if (isServerError) {
        console.error('----Server Side Error----');
        showErrors();

    }
    else {
        console.error('----Client Side Error----');
        showErrors();
    }



    if (isProduction && isServerError && !shouldShown) {
        statusCode = 500;
        errorType = 'ServerError';
        message = "Something went wrong"

    }

    res.status(responseStatus).json({
        requestId,
        errorType,
        message,
        status: 'error'
    })
}

