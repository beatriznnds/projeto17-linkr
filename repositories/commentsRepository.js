import connection from '../database.js';

async function publishComment(comment, publicationId, userId) {
    await connection.query(` 
        INSERT INTO comments (content, "publicationId", "userId") 
        VALUES ($1, $2, $3) 
    `, [comment, publicationId, userId]);
}

async function getComments(publicationId) {
    return await connection.query(` 
        SELECT comments.id, comments.content, publications.id AS "publicationId", users.id AS "userId", users.username, users."profilePic" 
        FROM comments
        JOIN publications
        ON comments."publicationId" = publications.id 
        JOIN users
        ON comments."userId" = users.id 
        WHERE publications.id = $1
        ORDER BY comments."createdAt" 
    `, [publicationId]);
}

export const commentsRepository = {
    publishComment,
    getComments
};