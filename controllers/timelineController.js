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
      'select publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id'
    );

    res.send(publications).status(200);
  } catch {
    res.sendStatus(400);
  }
}
