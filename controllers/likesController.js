import likesRepository from "../repositories/likesRepository.js";

export async function likePost(req, res) {
    const { publicationId } = req.body;
    const { userId } = res.locals;
    try {
        await likesRepository.likePost(userId, publicationId);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function unlikePost(req, res) {
    const { publicationId } = req.body;
    const { userId } = res.locals;
    try {
        await likesRepository.unlikePost(userId, publicationId);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

}

export async function getLikes(req, res) {
    const {publicationId} = req.body;
    const userId = res.locals.userId;
    try {
        const like = await likesRepository.getLikes(publicationId, userId);
        return res.status(200).send(like.rows);
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function getCountLikes(req, res) {
    const {publicationId} = req.body;
    try {
        const { rows: count } = await likesRepository.getCountLikes(publicationId);
        return res.status(200).send(count[0]);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getNames(req, res) {
    const {publicationId} = req.body;
    const userId = res.locals.userId;
    try {
        const { rows: names } = await likesRepository.getNames(publicationId, userId);
        return res.status(200).send(names);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}