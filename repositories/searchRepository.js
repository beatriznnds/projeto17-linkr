import connection from "../database.js";

async function searchUser(nameSearch){
    return connection.query (`SELECT id, username, "profilePic", null AS "isFollowing" FROM users WHERE LOWER(username) LIKE $1`, [nameSearch.toLowerCase() + '%']);
}

async function searchFollowing (userId) {
    return connection.query(`SELECT u1.id, u2.username, u2."profilePic", followers."followedUserId" as "isFollowing"
    FROM users u1
    LEFT JOIN followers
    ON u1.id = followers."userId"
    LEFT JOIN users u2
    ON u2.id = followers."followedUserId"
    WHERE u1.id = $1`, [userId]);
}

export const searchRepository = {
    searchUser,
    searchFollowing
}
