import type { ErrorRequestHandler } from "express";



export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    let message = err.message || 'Something went wrong';
    let statusCode = err.statusCode || err.status || 500;
    let errorType = err.errorType || 'Unknown';



}