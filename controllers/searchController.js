import { searchRepository } from "../repositories/searchRepository.js"
import {authRepository} from "../repositories/authRepository.js";

export async function searchUser(req, res) {
    const username = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    try {
        const { rows: validToken } = await authRepository.searchToken(token)
        if (validToken.length === 0) {
            return res.sendStatus(404);
        }
        const { rows: users } = await searchRepository.searchUser(username.searchUsers)
        res.send(users).status(200);
    } catch (error) {
        res.sendStatus(500);
    }
}
