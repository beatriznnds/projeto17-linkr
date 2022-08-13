import connection from "../database.js";
import urlMetadata from "url-metadata";

export async function timeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  try {
    const { rows: publications } = await connection.query(
      'select publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id ORDER BY publications."createdAt" desc LIMIT 20'
    );

    res.send(publications).status(200);
  } catch {
    res.sendStatus(400);
  }
}

export async function userTimeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { id } = req.params;
  console.log(id);

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  try {
    const { rows: publications } = await connection.query(
      'select publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id WHERE users.id = $1 ORDER BY publications."createdAt" desc LIMIT 20',
      [id]
    );

    res.send(publications).status(200);
  } catch {
    res.sendStatus(400);
  }
}
