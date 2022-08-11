import connection from "../database.js";

export async function timeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  console.log(token);

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  try {
    const { rows: body } = await connection.query("SELECT * FROM publications");

    res.send(body).status(200);
  } catch {
    res.sendStatus(400);
  }
}
