import connection from "../database.js";

async function addNewPost (id, link, description) {
    return connection.query(`INSERT INTO publications ("userId", link, description) VALUES ($1, $2, $3)`, [id, link, description]);
}

async function editPost (description, publicationId, userId) {
    return connection.query(`UPDATE publications SET description = $1 WHERE id = $2 AND "userId" = $3`, [description, publicationId, userId]);
}

async function searchPost (publicationId) {
   return connection.query(`SELECT * FROM publications WHERE id = $1`, [publicationId]);
}

export const postRepository = {
    addNewPost,
    editPost,
    searchPost
}