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

async function editPost(description, id) {
  return connection.query(
    `UPDATE publications SET description = $1 WHERE id = $2`,
    [description, id]
  );
}

async function searchPost(publicationId) {
  return connection.query(`SELECT * FROM publications WHERE id = $1`, [
    publicationId,
  ]);
}

async function searchLastPost() {
  return connection.query(`SELECT id FROM publications order by id DESC limit 1;`);
}

async function deletePost(publicationId) {
  return connection.query(`DELETE FROM publications WHERE id = $1`, [
    publicationId,
  ]);
}

export const postRepository = {
  addNewPost,
  editPost,
  searchPost,
  searchLastPost,
  deletePost,
};
