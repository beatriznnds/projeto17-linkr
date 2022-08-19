import connection from "../database.js";

async function checkFollowers (userId, id) {
    return connection.query(`SELECT * FROM followers WHERE "userId" = $1 AND "followedUserId" = $2`, [userId, id]);
}

async function followUser (userId, userPageId) {
    return connection.query(`INSERT INTO followers ("userId", "followedUserId") VALUES ($1, $2)`, [userId, userPageId]);
}

async function unfollowUser (userId, userPageId) {
    return connection.query(`DELETE FROM followers WHERE "userId" = $1 AND "followedUserId" = $2`, [userId, userPageId]);
}
 
export const followersRepository = {
    checkFollowers,
    followUser,
    unfollowUser
};