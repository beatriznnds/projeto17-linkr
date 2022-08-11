import connection from "../database.js";
import { postRepository } from "../repositories/postRepository.js";

export async function newPost (req, res) {
    const { link, description } = req.body;
    const { userId } = res.locals;
    try {
        await postRepository.addNewPost(userId, link, description);
        return res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function editPost (req, res) {
    const { publicationId, description } = req.body;
    const { userId } = res.locals;
    
    try {
        const { rows: validatePost } = await postRepository.searchPost(publicationId);
        if (validatePost.length === 0 ) {
            return res.sendStatus(404);
        }
        if (validatePost[0].userId !== userId) {
            return res.sendStatus(401);
        }
        await postRepository.editPost(description, publicationId, userId);
        res.sendStatus(200);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}