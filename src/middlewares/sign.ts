
import { signValidator } from "../validator/zod.js"

export const zodMiddleware = (req, res, next) => {
    // zod checking
    const { success } = signValidator(req.data);
    if (success) next();
    else res.status(401).json({ message: "invalid inputs" });
}

