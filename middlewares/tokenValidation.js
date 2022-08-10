import connection from "../database.js";

export async function validateToken (req, res, next) {    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    try {
        const { rows: validToken } = await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if (validToken.length === 0) {
            return res.sendStatus(401);
        }
        res.locals.userId = validToken[0].userId;
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
};