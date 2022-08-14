import connection from "../database.js";
import { authRepository } from "../repositories/authRepository.js";


export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  console.log(token);

  try {
    const { rows: validToken } = await authRepository.searchToken(token);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }
    res.locals.userId = validToken[0].userId;

  } catch (e) {
    return res.sendStatus(500);
  }
  next();
}
