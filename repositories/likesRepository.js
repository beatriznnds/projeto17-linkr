import connection from '../database.js';

async function getPost(param) {
    return connection.query(
        `SELECT * FROM publications WHERE id = $1`, [param]
    );
}

async function likePost(userId, publicationId) {
    return connection.query(
        `INSERT INTO likes ("userId", "publicationId") VALUES ($1, $2)`, [userId, publicationId]
    );
}

async function unlikePost(userId, publicationId) {
    return connection.query(
        `DELETE FROM likes WHERE VALUES ($1, $2)`, [userId, publicationId]
    );
}

async function getLikes(param, userId) {
    return connection.query(
        ` 
        SELECT * FROM likes WHERE "publicationId" = $1 AND "userId" = $2
      `,
        [param, userId]
    );
}

async function getCountLikes(param) {
    return connection.query(
        ` 
        SELECT COUNT(id) FROM likes
        WHERE "publicationId" = $1
      `,
        [param]
    );
}

async function getNames(param) {
    return connection.query(
        `
         SELECT users.name FROM likes 
         JOIN users
         ON likes."userId" = users.id
         WHERE likes."publicationId" = $1
         LIMIT 3
      `,
        [param]
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