import { searchRepository } from "../repositories/searchRepository.js"
import { authRepository } from "../repositories/authRepository.js";
import connection from "../database.js";

export async function searchUser(req, res) {
    const { nameSearch } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    console.log(token);
    try {
        const { rows: validToken } = await authRepository.searchToken(token);
        if (validToken.length === 0) {
            return res.sendStatus(404);
        }
        const { rows: users } = await searchRepository.searchUser(nameSearch);
        const { rows: following } = await searchRepository.searchFollowing(validToken[0].userId, nameSearch);
        res.send({ following, users }).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
