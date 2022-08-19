import { commentsRepository } from "../repositories/commentsRepository.js";

export async function postComment(req, res) {
    const { comment } = req.body;
    const { id: publicationId } = req.params;
    const userId = res.locals.userId;
    console.log(req.body);
    console.log(publicationId);
    console.log(userId);
    try {
        await commentsRepository.publishComment(comment, publicationId, userId);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function getCommentsById(req, res) {
    const { id: publicationId } = req.params;
    const userId = res.locals.userId;
    try {
        const comments = await commentsRepository.getComments(publicationId);
        return res.status(200).send(comments.rows);
    } catch (error) {
        return res.status(500).send(error);
    }
}