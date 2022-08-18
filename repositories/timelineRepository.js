import connection from "../database.js";

async function timeline(page) {
  return connection.query(
    'SELECT publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id ORDER BY publications."createdAt" desc LIMIT 10 OFFSET $1 * 10',
    [page]
  );
}

async function userTimeline(id) {
  return connection.query(
    'SELECT publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id WHERE users.id = $1 ORDER BY publications."createdAt" desc LIMIT 20',
    [id]
  );
}

async function hashtagTimeline(hashtag) {
  return connection.query(
    `SELECT publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id WHERE LOWER(description) LIKE $1 ORDER BY publications."createdAt" desc LIMIT 20`,
    ["%#" + hashtag.toLowerCase() + "%"]
  );
}

async function trendings() {
  return connection.query(
    `SELECT hashtag, COUNT(id) AS "valueOccurrence" FROM hashtags GROUP BY hashtag ORDER BY "valueOccurrence" DESC LIMIT 10`
  );
}

export const timelineRepository = {
  timeline,
  userTimeline,
  hashtagTimeline,
  trendings,
};
