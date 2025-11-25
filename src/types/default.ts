// ambient module augmentation for express request
declare module "express-serve-static-core" {
    interface Request {
        requestId?: string;
    }
}