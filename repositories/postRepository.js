import connection from "../database.js";

async function addNewPost(
  id,
  link,
  description,
  urltitle,
  urlimage,
  urldescription
) {
  return connection.query(
    `INSERT INTO publications ("userId", link, description, "urlTitle", "urlImage", "urlDescription") VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, link, description, urltitle, urlimage, urldescription]
  );
}

async function editPost(description, publicationId, userId) {
  return connection.query(
    `UPDATE publications SET description = $1 WHERE id = $2 AND "userId" = $3`,
    [description, publicationId, userId]
  );
}

async function searchPost(publicationId) {
  return connection.query(`SELECT * FROM publications WHERE id = $1`, [
    publicationId,
  ]);
}

export const postRepository = {
  addNewPost,
  editPost,
  searchPost,
};
