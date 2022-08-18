import connection from "../database.js";
import { followersRepository } from "../repositories/followersRepository.js";

export async function followUser (req, res) {
    const { userId } = res.locals;
    const { userPageId } = req.body;

    if (userId === userPageId) {
        return res.send('impossible').status(400);
    };

    try {
        const { rows: followers } = await followersRepository.checkFollowers(userId, userPageId);

        if (followers.length === 0) {
            await followersRepository.followUser(userId, userPageId);
            return res.send('followed').status(200);
        } else {
            await followersRepository.unfollowUser(userId, userPageId)
            return res.send('unfollowed').status(200);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function checkFollow (req, res) {
    const { userId }= res.locals;
    const { userPageId } = req.query;
    try {
        const { rows: followers } = await followersRepository.checkFollowers(userId, userPageId);
        if (followers.length > 0) {
            return res.send(true).status(200);
        } else {
            return res.send(false).status(200);
        }        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function checkIfUserFollows (req, res) {
    const { userId } = res.locals;
    try {
        const { rows: following } = await connection.query(`SELECT * FROM followers WHERE "userId" = $1`, [userId]);
        if (following.length === 0) {
            return res.send(false).status(200);

        } else {
            return res.send(true).status(200);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}