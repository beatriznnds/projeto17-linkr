import connection from "../database.js";

async function timeline(userId, page) {
  return connection.query(
    `SELECT u1.id, u2.username, u2."profilePic", followers."followedUserId" as "isFollowing",
    p.id as "publicationId", p.link, p.description, p."urlTitle", p."urlImage", p."urlDescription",
    COUNT(l.id) as "howManyLikes"
        FROM users u1
        LEFT JOIN followers
        ON u1.id = followers."userId"
        LEFT JOIN users u2
        ON u2.id = followers."followedUserId"
        left join publications p
        on p."userId" = u2.id
        join likes l
        on l."publicationId" = p.id
        WHERE u1.id = $1
        group by u1.id, u2.username, u2."profilePic", followers."followedUserId", p.id
        ORDER BY p."createdAt" desc LIMIT 10 OFFSET $2 * 10;`,
    [userId, page]
  );
}

async function userCountTimeline(myId, lastId) {
  return connection.query(
    `SELECT COUNT(p.id)
  FROM users u1
  LEFT JOIN followers
  ON u1.id = followers."userId"
  LEFT JOIN users u2
  ON u2.id = followers."followedUserId"
  left join publications p
  on p."userId" = u2.id
  WHERE u1.id = $1 and p.id > $2`,
    [myId, lastId]
  );
}

async function userTimeline (id) {
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
  userCountTimeline,
};
