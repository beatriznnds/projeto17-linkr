import { postRepository } from "../repositories/postRepository.js";

export async function newPost (req, res) {
    const { link, description } = req.body;
    const { userId } = res.locals;
    try {
        await postRepository.addNewPost(userId, link, description);
        return res.sendStatus(201)
    } catch (e) {
        res.sendStatus(500);
    }
}