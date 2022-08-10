import connection from "../database.js";

async function addNewPost (id, link, description) {
    return connection.query(`INSERT INTO publications ("userId", link, description) VALUES ($1, $2, $3)`, [id, link, description]);
}

export const postRepository = {
    addNewPost
}