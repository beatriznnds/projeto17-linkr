import { searchRepository } from "../repositories/searchRepository.js"

export async function searchUser(req, res) {
    const { nameSearch } = req.body;
    console.log(req.body)
    try {
        const { rows: users } = await searchRepository.searchUser(nameSearch);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
