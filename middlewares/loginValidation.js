import signInSchema from "../schemas/signInSchema.js";

export default function userLoginValidationMiddleware(req, res, next){
    const validation = signInSchema.validate(req.body, {abortEarly: false});
    if(validation.error){
        return res.sendStatus(422);
    }
    next();
}