import connection from '../database.js';

async function getPost(publicationId) {
    return connection.query(
        `SELECT * FROM publications WHERE id = $1`, [publicationId]
    );
}

async function likePost(userId, publicationId) {
    return connection.query(
        `INSERT INTO likes ("userId", "publicationId") VALUES ($1, $2)`, [userId, publicationId]
    );
}

async function unlikePost(userId, publicationId) {
    return connection.query(
        `DELETE FROM likes WHERE "userId" = $1 AND "publicationId" = $2`, [userId, publicationId]
    );
}

async function getLikes(publicationId, userId) {
    return connection.query(
        ` 
        SELECT * FROM likes WHERE "publicationId" = $1 AND "userId" = $2
      `,
        [publicationId, userId]
    );
}

async function getCountLikes(publicationId) {
    return connection.query(
        ` 
        SELECT COUNT(id) FROM likes
        WHERE "publicationId" = $1
      `,
        [publicationId]
    );
}

async function getNames(publicationId) {
    return connection.query(
        `
         SELECT users.username, likes."userId" FROM likes 
         JOIN users
         ON likes."userId" = users.id
         WHERE likes."publicationId" = $1
         LIMIT 3
      `,
        [publicationId]
    );
}

const likesRepository = {
    getPost,
    likePost,
    unlikePost,
    getLikes,
    getCountLikes,
    getNames
};

export default likesRepository;