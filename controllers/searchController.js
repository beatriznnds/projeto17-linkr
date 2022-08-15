import { searchRepository } from "../repositories/searchRepository.js"
import { authRepository } from "../repositories/authRepository.js";

export async function searchUser(req, res) {
    const { nameSearch } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    try {
        const { rows: validToken } = await authRepository.searchToken(token);
        if (validToken.length === 0) {
            return res.sendStatus(404);
        }
        console.log(validToken);
        const { rows: users } = await searchRepository.searchUser(nameSearch);
        console.log(users);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
